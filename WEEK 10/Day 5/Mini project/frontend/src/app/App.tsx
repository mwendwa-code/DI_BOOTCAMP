import { useEffect, useMemo, useState, type FormEvent } from "react";
import type { Story } from "@shared/index";
import { useAppDispatch, useAppSelector } from "./hooks";
import { addComment, addContributor, deleteStory, loadStories, loadStoryDetails, removeContributor, saveStory } from "../features/stories/storiesSlice";
import { clearAuthError, clearSession, login, logout, register, restoreSession } from "../features/auth/authSlice";
import { clearStoriesError } from "../features/stories/storiesSlice";

type AuthMode = "login" | "register";
type StoryFilter = "all" | "mine" | "collaborating";

export default function App() {
  const dispatch = useAppDispatch();
  const { user, accessToken, initialized, error: authError } = useAppSelector((state) => state.auth);
  const { items, status, error: storiesError, comments, versions } = useAppSelector((state) => state.stories);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [filter, setFilter] = useState<StoryFilter>("all");
  const [search, setSearch] = useState("");
  const [activeStoryId, setActiveStoryId] = useState<number | null>(null);
  const [editingStory, setEditingStory] = useState<Story | null | undefined>(undefined);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [busy, setBusy] = useState(false);
  const activeStory = items.find((story) => story.id === activeStoryId) ?? null;

  useEffect(() => {
    void dispatch(restoreSession());
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (initialized && accessToken) void dispatch(loadStories());
  }, [initialized, accessToken, dispatch]);

  const visibleStories = useMemo(() => {
    const term = search.trim().toLowerCase();
    return items.filter((story) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "mine" && story.author.id === user?.id) ||
        (filter === "collaborating" && story.contributors.some((contributor) => contributor.id === user?.id));
      const matchesSearch =
        !term ||
        story.title.toLowerCase().includes(term) ||
        story.content.toLowerCase().includes(term) ||
        story.author.username.toLowerCase().includes(term);
      return matchesFilter && matchesSearch;
    });
  }, [filter, items, search, user?.id]);

  async function handleLogout(): Promise<void> {
    try {
      await dispatch(logout()).unwrap();
    } catch {
      dispatch(clearSession());
    }
    setActiveStoryId(null);
  }

  if (!initialized) {
    return <main className="boot-screen"><span className="brand-mark">f</span><p>Finding your next chapter…</p></main>;
  }

  if (!user || !accessToken) {
    return (
      <AuthScreen
        mode={authMode}
        error={authError}
        onModeChange={(mode) => {
          dispatch(clearAuthError());
          setAuthMode(mode);
        }}
        onLogin={(email, password) => dispatch(login({ email, password }))}
        onRegister={(username, email, password) => dispatch(register({ username, email, password }))}
      />
    );
  }

  const isAuthor = (story: Story) => story.author.id === user.id;
  const canEdit = (story: Story) =>
    isAuthor(story) || story.contributors.some((contributor) => contributor.id === user.id);

  async function save(input: { title: string; content: string }): Promise<void> {
    setBusy(true);
    try {
      const story = await dispatch(
        saveStory({ ...input, ...(editingStory ? { id: editingStory.id } : {}) }),
      ).unwrap();
      setEditingStory(undefined);
      setActiveStoryId(story.id);
    } catch {
      // The Redux error is shown in the editor.
    } finally {
      setBusy(false);
    }
  }

  async function removeStory(story: Story): Promise<void> {
    if (!window.confirm(`Delete “${story.title}”? This cannot be undone.`)) return;
    try {
      await dispatch(deleteStory(story.id)).unwrap();
      setActiveStoryId(null);
    } catch {
      // The Redux error banner reports the failure.
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Fable home">
          <span className="brand-mark">f</span><span>fable<span className="brand-period">.</span></span>
        </a>
        <div className="topbar-actions">
          <span className="welcome">Hi, {user.username}</span>
          <button className="icon-button" type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
            {theme === "dark" ? "☼" : "☾"}
          </button>
          <button className="button button-quiet button-small" onClick={() => void handleLogout()}>Sign out</button>
        </div>
      </header>

      <main className="page-content">
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow"><span className="live-dot" /> A LITTLE MAGIC, MADE TOGETHER</span>
            <h1>Every story starts<br />with <em>someone.</em></h1>
            <p>Write a first line. Invite a co-author. See where the story takes you.</p>
            <button className="button button-primary" onClick={() => { dispatch(clearStoriesError()); setEditingStory(null); }}>
              <span aria-hidden="true">＋</span> Start a story
            </button>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="book">
              <div className="book-page page-left"><span>once</span><i>upon</i><b>a time</b></div>
              <div className="book-page page-right"><span>we</span><i>wrote</i><b>together</b></div>
            </div>
            <span className="spark spark-a">✳</span><span className="spark spark-b">✦</span><span className="spark spark-c">✧</span>
            <div className="art-caption">Your next chapter<br /><strong>is unwritten.</strong></div>
          </div>
        </section>

        {editingStory !== undefined && (
          <StoryEditor
            story={editingStory}
            busy={busy || status === "saving"}
            error={storiesError}
            onCancel={() => { setEditingStory(undefined); dispatch(clearStoriesError()); }}
            onSave={(input) => void save(input)}
          />
        )}

        <section className="library-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">THE STORY SHELF</span>
              <h2>Stories in progress <span className="count">{visibleStories.length.toString().padStart(2, "0")}</span></h2>
            </div>
            <label className="search-box">
              <span aria-hidden="true">⌕</span>
              <input aria-label="Search stories" placeholder="Find a story..." value={search} onChange={(event) => setSearch(event.target.value)} />
              <kbd>⌘ K</kbd>
            </label>
          </div>
          <div className="library-controls">
            <div className="filter-tabs" role="tablist" aria-label="Filter stories">
              {([
                ["all", "All stories"],
                ["mine", "My stories"],
                ["collaborating", "Collaborating"],
              ] as const).map(([value, label]) => (
                <button key={value} className={filter === value ? "filter-tab active" : "filter-tab"} onClick={() => setFilter(value)} role="tab" aria-selected={filter === value}>{label}</button>
              ))}
            </div>
            <span className="library-note">A collection of shared imagination</span>
          </div>
          {storiesError && <p className="inline-error" role="alert">{storiesError}</p>}
          {status === "loading" && items.length === 0 ? (
            <div className="empty-state"><div className="loader" /><p>Gathering stories…</p></div>
          ) : visibleStories.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">✳</div>
              <h3>{search || filter !== "all" ? "No stories found" : "A blank page is full of possibility"}</h3>
              <p>{search || filter !== "all" ? "Try another search or filter." : "Start a story, and invite someone to write the next line."}</p>
              {!search && filter === "all" && <button className="button button-outline" onClick={() => setEditingStory(null)}>Write your first story</button>}
            </div>
          ) : (
            <div className="story-grid">
              {visibleStories.map((story, index) => (
                <StoryCard key={story.id} story={story} index={index} onOpen={() => setActiveStoryId(story.id)} />
              ))}
            </div>
          )}
        </section>
      </main>

      {activeStory && (
        <StoryDetail
          story={activeStory}
          userId={user.id}
          canEdit={canEdit(activeStory)}
          isAuthor={isAuthor(activeStory)}
          comments={comments[activeStory.id] ?? []}
          versions={versions[activeStory.id] ?? []}
          error={storiesError}
          onClose={() => setActiveStoryId(null)}
          onEdit={() => { setEditingStory(activeStory); setActiveStoryId(null); }}
          onDelete={() => void removeStory(activeStory)}
          onLoadDetails={() => void dispatch(loadStoryDetails(activeStory.id))}
          onAddComment={(content) => dispatch(addComment({ storyId: activeStory.id, content })).unwrap()}
          onAddContributor={(identity) => dispatch(addContributor({ storyId: activeStory.id, ...identity })).unwrap()}
          onRemoveContributor={(contributorId) => dispatch(removeContributor({ storyId: activeStory.id, contributorId })).unwrap()}
        />
      )}
    </div>
  );
}

function AuthScreen({
  mode,
  error,
  onModeChange,
  onLogin,
  onRegister,
}: {
  mode: AuthMode;
  error: string | null;
  onModeChange: (mode: AuthMode) => void;
  onLogin: (email: string, password: string) => unknown;
  onRegister: (username: string, email: string, password: string) => unknown;
}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isRegister = mode === "register";

  function submit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (isRegister) onRegister(username.trim(), email.trim(), password);
    else onLogin(email.trim(), password);
  }

  return (
    <main className="auth-shell">
      <section className="auth-aside">
        <a className="brand" href="#"><span className="brand-mark">f</span><span>fable<span className="brand-period">.</span></span></a>
        <div className="auth-quote">
          <span className="eyebrow">WORDS ARE BETTER SHARED</span>
          <h1>Some stories<br />are too good<br />to write <em>alone.</em></h1>
          <p>A cozy corner of the internet for the stories we make together.</p>
          <span className="quote-decoration">“</span>
        </div>
        <span className="auth-footnote">A little imagination goes a long way.</span>
      </section>
      <section className="auth-main">
        <form className="auth-form" onSubmit={submit}>
          <span className="eyebrow">{isRegister ? "YOUR STORY BEGINS HERE" : "WELCOME BACK, STORYTELLER"}</span>
          <h2>{isRegister ? "Create your account" : "Come on in"}</h2>
          <p>{isRegister ? "Make a home for all the stories in your head." : "Your next chapter is waiting."}</p>
          {isRegister && (
            <label className="field-label">Your name
              <input autoComplete="username" required maxLength={50} value={username} onChange={(event) => setUsername(event.target.value)} placeholder="What should we call you?" />
            </label>
          )}
          <label className="field-label">Email address
            <input type="email" autoComplete="email" required maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
          </label>
          <label className="field-label">Password
            <input type="password" autoComplete={isRegister ? "new-password" : "current-password"} minLength={8} maxLength={72} required value={password} onChange={(event) => setPassword(event.target.value)} placeholder={isRegister ? "At least 8 characters" : "Your password"} />
          </label>
          {error && <p className="inline-error" role="alert">{error}</p>}
          <button className="button button-primary auth-submit" type="submit">{isRegister ? "Create account" : "Sign in"} <span aria-hidden="true">→</span></button>
          <p className="auth-switch">
            {isRegister ? "Already have an account?" : "New around here?"}{" "}
            <button type="button" onClick={() => onModeChange(isRegister ? "login" : "register")}>{isRegister ? "Sign in" : "Create an account"}</button>
          </p>
        </form>
      </section>
    </main>
  );
}

function StoryEditor({
  story,
  busy,
  error,
  onCancel,
  onSave,
}: {
  story: Story | null;
  busy: boolean;
  error: string | null;
  onCancel: () => void;
  onSave: (story: { title: string; content: string }) => void;
}) {
  const [title, setTitle] = useState(story?.title ?? "");
  const [content, setContent] = useState(story?.content ?? "");
  const [words, setWords] = useState(content.trim() ? content.trim().split(/\s+/).length : 0);

  return (
    <section className="editor-panel" aria-label={story ? "Edit story" : "Create a story"}>
      <div className="editor-heading">
        <div><span className="eyebrow">{story ? "BACK TO THE DRAFT" : "A NEW BEGINNING"}</span><h2>{story ? "Edit your story" : "Start with a title"}</h2></div>
        <button className="icon-button" onClick={onCancel} aria-label="Close editor">×</button>
      </div>
      <form onSubmit={(event) => { event.preventDefault(); onSave({ title: title.trim(), content: content.trim() }); }}>
        <label className="field-label">Story title<input autoFocus maxLength={255} required value={title} onChange={(event) => setTitle(event.target.value)} placeholder="The little things we found..." /></label>
        <label className="field-label">Your story<textarea required rows={7} value={content} onChange={(event) => { const value = event.target.value; setContent(value); setWords(value.trim() ? value.trim().split(/\s+/).length : 0); }} placeholder="It all started on a Tuesday..." /></label>
        <div className="editor-footer">
          <span>{words} {words === 1 ? "word" : "words"} <span className="dot-separator">·</span> Saved when you publish</span>
          <div className="button-row"><button className="button button-quiet" type="button" onClick={onCancel}>Cancel</button><button className="button button-primary" type="submit" disabled={busy}>{busy ? "Saving…" : story ? "Save changes" : "Publish story"}</button></div>
        </div>
        {error && <p className="inline-error" role="alert">{error}</p>}
      </form>
    </section>
  );
}

function StoryCard({ story, index, onOpen }: { story: Story; index: number; onOpen: () => void }) {
  const accent = `accent-${(index % 4) + 1}`;
  const excerpt = story.content.length > 150 ? `${story.content.slice(0, 150).trimEnd()}…` : story.content;
  return (
    <button className={`story-card ${accent}`} onClick={onOpen}>
      <div className="card-topline"><span className="card-category"><span className="category-dot" /> COLLABORATIVE STORY</span><span aria-hidden="true" className="card-arrow">↗</span></div>
      <h3>{story.title}</h3>
      <p className="card-excerpt">{excerpt}</p>
      <div className="card-bottom">
        <div className="avatar-stack" aria-label={`${story.contributors.length + 1} authors`}>
          <span className="avatar avatar-author" title={story.author.username}>{story.author.username.slice(0, 1).toUpperCase()}</span>
          {story.contributors.slice(0, 2).map((person) => <span className="avatar" key={person.id} title={person.username}>{person.username.slice(0, 1).toUpperCase()}</span>)}
          {story.contributors.length > 2 && <span className="avatar avatar-more">+{story.contributors.length - 2}</span>}
        </div>
        <span className="byline">Started by <strong>{story.author.username}</strong></span>
      </div>
    </button>
  );
}

function StoryDetail({
  story,
  userId,
  canEdit,
  isAuthor,
  comments,
  versions,
  error,
  onClose,
  onEdit,
  onDelete,
  onLoadDetails,
  onAddComment,
  onAddContributor,
  onRemoveContributor,
}: {
  story: Story;
  userId: number;
  canEdit: boolean;
  isAuthor: boolean;
  comments: import("@shared/index").StoryComment[];
  versions: import("@shared/index").StoryVersion[];
  error: string | null;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onLoadDetails: () => void;
  onAddComment: (content: string) => Promise<unknown>;
  onAddContributor: (identity: { userId?: number; email?: string }) => Promise<unknown>;
  onRemoveContributor: (contributorId: number) => Promise<unknown>;
}) {
  const [comment, setComment] = useState("");
  const [contributorId, setContributorId] = useState("");
  const [busy, setBusy] = useState(false);
  const [detailError, setDetailError] = useState("");

  useEffect(() => {
    onLoadDetails();
  }, [story.id]);

  async function submitComment(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (!comment.trim()) return;
    setBusy(true);
    try {
      await onAddComment(comment.trim());
      setComment("");
      setDetailError("");
    } catch (requestError) {
      setDetailError(requestError instanceof Error ? requestError.message : "Unable to add comment.");
    } finally {
      setBusy(false);
    }
  }

  async function submitContributor(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const identity = contributorId.trim();
    const numericId = Number(identity);
    const invite = Number.isSafeInteger(numericId) && numericId > 0
      ? { userId: numericId }
      : { email: identity };
    if (!identity || (!invite.userId && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identity))) {
      setDetailError("Enter a valid email address or account ID.");
      return;
    }
    setBusy(true);
    try {
      await onAddContributor(invite);
      setContributorId("");
      setDetailError("");
    } catch (requestError) {
      setDetailError(requestError instanceof Error ? requestError.message : "Unable to add contributor.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <article className="story-modal" role="dialog" aria-modal="true" aria-labelledby="story-title">
        <button className="modal-close icon-button" onClick={onClose} aria-label="Close story">×</button>
        <div className="modal-meta"><span className="eyebrow"><span className="category-dot" /> STORY IN PROGRESS</span><span>Started by {story.author.username}</span></div>
        <h2 id="story-title">{story.title}</h2>
        <div className="modal-authors">
          <span className="avatar avatar-author">{story.author.username.slice(0, 1).toUpperCase()}</span><span className="author-name">{story.author.username}<small>Author</small></span>
          {story.contributors.map((person) => (
            <span className="contributor-chip" key={person.id}>
              <span className="avatar">{person.username.slice(0, 1).toUpperCase()}</span>
              <span>{person.username}</span>
              {isAuthor && person.contributorId && <button className="remove-chip" title={`Remove ${person.username}`} onClick={() => { void onRemoveContributor(person.contributorId).catch((requestError: unknown) => setDetailError(requestError instanceof Error ? requestError.message : "Unable to remove contributor.")); }}>×</button>}
            </span>
          ))}
        </div>
        <div className="story-body">{story.content}</div>
        <div className="story-actions">
          {canEdit && <button className="button button-primary button-small" onClick={onEdit}>Continue writing <span aria-hidden="true">↗</span></button>}
          {isAuthor && <button className="button button-quiet button-small danger-text" onClick={onDelete}>Delete story</button>}
          {isAuthor && (
            <form className="invite-form" onSubmit={(event) => void submitContributor(event)}>
              <input aria-label="Contributor email or account ID" value={contributorId} onChange={(event) => setContributorId(event.target.value)} placeholder="Contributor email or account ID" />
              <button className="button button-outline button-small" type="submit" disabled={busy}>Invite</button>
            </form>
          )}
        </div>
        {(detailError || error) && <p className="inline-error" role="alert">{detailError || error}</p>}

        <section className="detail-section">
          <div className="detail-heading"><div><span className="eyebrow">THE JOURNEY SO FAR</span><h3>Previous drafts <span className="count">{versions.length}</span></h3></div></div>
          {versions.length === 0 ? <p className="muted-copy">No edits yet. This is the first draft.</p> : (
            <div className="version-list">
              {versions.slice(0, 5).map((version) => (
                <details className="version-item" key={version.id}>
                  <summary><span>{version.title}</span><small>Edited by {version.editedBy.username} · {new Date(version.editedAt).toLocaleDateString()}</small></summary>
                  <p>{version.content}</p>
                </details>
              ))}
            </div>
          )}
        </section>

        <section className="detail-section comments-section">
          <div className="detail-heading"><div><span className="eyebrow">LEAVE A LITTLE NOTE</span><h3>Conversation <span className="count">{comments.length}</span></h3></div></div>
          {comments.length > 0 && <div className="comment-list">{comments.map((item) => <div className="comment" key={item.id}><span className="avatar">{item.author.username.slice(0, 1).toUpperCase()}</span><div><p><strong>{item.author.username}</strong><time>{new Date(item.createdAt).toLocaleDateString()}</time></p><span>{item.content}</span></div></div>)}</div>}
          <form className="comment-form" onSubmit={(event) => void submitComment(event)}>
            <label className="sr-only" htmlFor="comment-input">Write a comment</label>
            <textarea id="comment-input" rows={2} maxLength={2000} value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Add a thought or a little encouragement…" />
            <div className="comment-footer"><span>{userId > 0 ? "Kind words make good stories." : ""}</span><button className="button button-primary button-small" disabled={!comment.trim() || busy}>Send note</button></div>
          </form>
        </section>
      </article>
    </div>
  );
}
