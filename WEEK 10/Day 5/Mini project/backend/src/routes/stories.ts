import { Router } from "express";
import type { Contributor, Story, StoryComment, StoryVersion, User } from "../../../types";
import { pool } from "../db/pool";
import { authenticateToken, type AuthenticatedRequest } from "../middleware/auth";

const router = Router();
router.use(authenticateToken);

interface StoryRow {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  author_id: number;
  author_username: string;
  author_email: string;
  contributors: Contributor[];
}

const storySelect = `
  SELECT s.id, s.title, s.content, s.created_at, s.updated_at,
         author.id AS author_id, author.username AS author_username,
         author.email AS author_email,
         COALESCE(
           json_agg(json_build_object(
             'id', contributor.id,
             'username', contributor.username,
             'email', contributor.email,
             'contributorId', c.id
           )) FILTER (WHERE contributor.id IS NOT NULL),
           '[]'
         ) AS contributors
  FROM stories s
  JOIN users author ON author.id = s.author_id
  LEFT JOIN contributors c ON c.story_id = s.id
  LEFT JOIN users contributor ON contributor.id = c.user_id`;

function formatStory(row: StoryRow): Story {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    author: {
      id: row.author_id,
      username: row.author_username,
      email: row.author_email,
    },
    contributors: row.contributors ?? [],
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

function validId(value: string | string[]): number | null {
  if (typeof value !== "string") return null;
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

async function getStory(id: number): Promise<Story | undefined> {
  const result = await pool.query(
    `${storySelect} WHERE s.id = $1 GROUP BY s.id, author.id`,
    [id],
  );
  return result.rows[0] ? formatStory(result.rows[0] as StoryRow) : undefined;
}

async function canEdit(storyId: number, userId: number): Promise<boolean> {
  const result = await pool.query(
    `SELECT EXISTS (
       SELECT 1 FROM stories s
       LEFT JOIN contributors c ON c.story_id = s.id AND c.user_id = $2
       WHERE s.id = $1 AND (s.author_id = $2 OR c.user_id = $2)
     ) AS allowed`,
    [storyId, userId],
  );
  return result.rows[0].allowed as boolean;
}

router.get("/stories", async (req: AuthenticatedRequest, res, next) => {
  try {
    const result = await pool.query(
      `${storySelect} GROUP BY s.id, author.id ORDER BY s.updated_at DESC`,
    );
    res.json((result.rows as StoryRow[]).map(formatStory));
  } catch (error) {
    next(error);
  }
});

router.post("/stories", async (req: AuthenticatedRequest, res, next) => {
  const title = typeof req.body.title === "string" ? req.body.title.trim() : "";
  const content = typeof req.body.content === "string" ? req.body.content.trim() : "";
  if (!title || !content || title.length > 255) {
    res.status(400).json({ message: "A title (up to 255 characters) and story content are required." });
    return;
  }

  try {
    const result = await pool.query(
      `INSERT INTO stories (title, content, author_id)
       VALUES ($1, $2, $3) RETURNING id`,
      [title, content, req.userId],
    );
    const story = await getStory(result.rows[0].id as number);
    res.status(201).json(story);
  } catch (error) {
    next(error);
  }
});

router.get("/stories/:id", async (req, res, next) => {
  const id = validId(req.params.id);
  if (!id) {
    res.status(400).json({ message: "Invalid story ID." });
    return;
  }
  try {
    const story = await getStory(id);
    if (!story) {
      res.status(404).json({ message: "Story not found." });
      return;
    }
    res.json(story);
  } catch (error) {
    next(error);
  }
});

router.patch("/stories/:id", async (req: AuthenticatedRequest, res, next) => {
  const id = validId(req.params.id);
  const title = typeof req.body.title === "string" ? req.body.title.trim() : "";
  const content = typeof req.body.content === "string" ? req.body.content.trim() : "";
  if (!id || !title || !content || title.length > 255) {
    res.status(400).json({ message: "A valid story ID, title, and content are required." });
    return;
  }

  try {
    if (!(await canEdit(id, req.userId!))) {
      const exists = await pool.query("SELECT 1 FROM stories WHERE id = $1", [id]);
      res.status(exists.rowCount ? 403 : 404).json({
        message: exists.rowCount
          ? "Only the author and contributors can edit this story."
          : "Story not found.",
      });
      return;
    }

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query(
        `INSERT INTO story_versions (story_id, title, content, edited_by)
         SELECT id, title, content, $2 FROM stories WHERE id = $1`,
        [id, req.userId],
      );
      await client.query(
        "UPDATE stories SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3",
        [title, content, id],
      );
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
    res.json(await getStory(id));
  } catch (error) {
    next(error);
  }
});

router.delete("/stories/:id", async (req: AuthenticatedRequest, res, next) => {
  const id = validId(req.params.id);
  if (!id) {
    res.status(400).json({ message: "Invalid story ID." });
    return;
  }
  try {
    const result = await pool.query(
      "DELETE FROM stories WHERE id = $1 AND author_id = $2",
      [id, req.userId],
    );
    if (!result.rowCount) {
      const exists = await pool.query("SELECT 1 FROM stories WHERE id = $1", [id]);
      res.status(exists.rowCount ? 403 : 404).json({
        message: exists.rowCount ? "Only the author can delete this story." : "Story not found.",
      });
      return;
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.post("/contributors", async (req: AuthenticatedRequest, res, next) => {
  const storyId = Number(req.body.storyId ?? req.body.story_id);
  const requestedUserId = req.body.userId ?? req.body.user_id;
  const userId = requestedUserId === undefined ? null : Number(requestedUserId);
  const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
  if (
    !Number.isSafeInteger(storyId) ||
    storyId < 1 ||
    (!email && (!userId || !Number.isSafeInteger(userId) || userId < 1))
  ) {
    res.status(400).json({ message: "A valid story ID and contributor email or user ID are required." });
    return;
  }
  try {
    const story = await pool.query("SELECT author_id FROM stories WHERE id = $1", [storyId]);
    if (!story.rowCount) {
      res.status(404).json({ message: "Story not found." });
      return;
    }
    if (story.rows[0].author_id !== req.userId) {
      res.status(403).json({ message: "Only the story author can add contributors." });
      return;
    }
    const target = email
      ? await pool.query("SELECT id, username, email FROM users WHERE email = $1", [email])
      : await pool.query("SELECT id, username, email FROM users WHERE id = $1", [userId]);
    if (!target.rowCount) {
      res.status(404).json({ message: "User not found." });
      return;
    }
    const targetUser = target.rows[0] as User;
    if (targetUser.id === req.userId) {
      res.status(400).json({ message: "The story author is already a contributor." });
      return;
    }
    await pool.query(
      "INSERT INTO contributors (story_id, user_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [storyId, targetUser.id],
    );
    const contributor = await pool.query(
      `SELECT u.id, u.username, u.email, c.id AS "contributorId"
       FROM contributors c JOIN users u ON u.id = c.user_id
       WHERE c.story_id = $1 AND c.user_id = $2`,
      [storyId, targetUser.id],
    );
    res.status(201).json(contributor.rows[0] as Contributor);
  } catch (error) {
    next(error);
  }
});

router.get("/contributors/:story_id", async (req, res, next) => {
  const storyId = validId(req.params.story_id);
  if (!storyId) {
    res.status(400).json({ message: "Invalid story ID." });
    return;
  }
  try {
    const result = await pool.query(
      `SELECT u.id, u.username, u.email, c.id AS "contributorId"
       FROM contributors c JOIN users u ON u.id = c.user_id
       WHERE c.story_id = $1 ORDER BY u.username`,
      [storyId],
    );
    res.json(result.rows as Contributor[]);
  } catch (error) {
    next(error);
  }
});

router.delete("/contributors/:id", async (req: AuthenticatedRequest, res, next) => {
  const id = validId(req.params.id);
  if (!id) {
    res.status(400).json({ message: "Invalid contributor ID." });
    return;
  }
  try {
    const result = await pool.query(
      `DELETE FROM contributors c USING stories s
       WHERE c.id = $1 AND s.id = c.story_id AND s.author_id = $2
       RETURNING c.id`,
      [id, req.userId],
    );
    if (!result.rowCount) {
      const exists = await pool.query("SELECT 1 FROM contributors WHERE id = $1", [id]);
      res.status(exists.rowCount ? 403 : 404).json({
        message: exists.rowCount
          ? "Only the story author can remove contributors."
          : "Contributor not found.",
      });
      return;
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.get("/stories/:id/versions", async (req, res, next) => {
  const storyId = validId(req.params.id);
  if (!storyId) {
    res.status(400).json({ message: "Invalid story ID." });
    return;
  }
  try {
    const result = await pool.query(
      `SELECT v.id, v.title, v.content, v.edited_at,
              u.id AS user_id, u.username, u.email
       FROM story_versions v JOIN users u ON u.id = v.edited_by
       WHERE v.story_id = $1 ORDER BY v.edited_at DESC`,
      [storyId],
    );
    const versions: StoryVersion[] = result.rows.map((row) => ({
      id: row.id as number,
      title: row.title as string,
      content: row.content as string,
      editedAt: (row.edited_at as Date).toISOString(),
      editedBy: {
        id: row.user_id as number,
        username: row.username as string,
        email: row.email as string,
      },
    }));
    res.json(versions);
  } catch (error) {
    next(error);
  }
});

router.get("/stories/:id/comments", async (req, res, next) => {
  const storyId = validId(req.params.id);
  if (!storyId) {
    res.status(400).json({ message: "Invalid story ID." });
    return;
  }
  try {
    const result = await pool.query(
      `SELECT c.id, c.story_id, c.content, c.created_at,
              u.id AS user_id, u.username, u.email
       FROM story_comments c JOIN users u ON u.id = c.author_id
       WHERE c.story_id = $1 ORDER BY c.created_at`,
      [storyId],
    );
    const comments: StoryComment[] = result.rows.map((row) => ({
      id: row.id as number,
      storyId: row.story_id as number,
      content: row.content as string,
      createdAt: (row.created_at as Date).toISOString(),
      author: {
        id: row.user_id as number,
        username: row.username as string,
        email: row.email as string,
      },
    }));
    res.json(comments);
  } catch (error) {
    next(error);
  }
});

router.post("/stories/:id/comments", async (req: AuthenticatedRequest, res, next) => {
  const storyId = validId(req.params.id);
  const content = typeof req.body.content === "string" ? req.body.content.trim() : "";
  if (!storyId || !content || content.length > 2000) {
    res.status(400).json({ message: "A valid story ID and comment (up to 2,000 characters) are required." });
    return;
  }
  try {
    const result = await pool.query(
      `INSERT INTO story_comments (story_id, author_id, content)
       SELECT $1, $2, $3 WHERE EXISTS (SELECT 1 FROM stories WHERE id = $1)
       RETURNING id, story_id, content, created_at`,
      [storyId, req.userId, content],
    );
    if (!result.rowCount) {
      res.status(404).json({ message: "Story not found." });
      return;
    }
    const comment = result.rows[0];
    const author = await pool.query(
      "SELECT id, username, email FROM users WHERE id = $1",
      [req.userId],
    );
    const response: StoryComment = {
      id: comment.id as number,
      storyId: comment.story_id as number,
      content: comment.content as string,
      createdAt: (comment.created_at as Date).toISOString(),
      author: author.rows[0] as User,
    };
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

export default router;
