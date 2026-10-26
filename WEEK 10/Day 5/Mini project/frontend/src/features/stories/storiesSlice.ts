import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Contributor, Story, StoryComment, StoryVersion } from "@shared/index";
import { authorizedRequest } from "../../app/authorizedRequest";
import type { AppDispatch, RootState } from "../../app/store";

interface StoryInput {
  title: string;
  content: string;
  id?: number;
}

interface StoriesState {
  items: Story[];
  status: "idle" | "loading" | "saving";
  error: string | null;
  comments: Record<number, StoryComment[]>;
  versions: Record<number, StoryVersion[]>;
}

const initialState: StoriesState = {
  items: [],
  status: "idle",
  error: null,
  comments: {},
  versions: {},
};

export const loadStories = createAsyncThunk<Story[], void, { state: RootState; dispatch: AppDispatch; rejectValue: string }>(
  "stories/load",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      return await authorizedRequest<Story[]>("/stories", getState, dispatch);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unable to load stories.");
    }
  },
);

export const saveStory = createAsyncThunk<Story, StoryInput, { state: RootState; dispatch: AppDispatch; rejectValue: string }>(
  "stories/save",
  async ({ id, ...input }, { getState, dispatch, rejectWithValue }) => {
    try {
      return await authorizedRequest<Story>(
        id ? `/stories/${id}` : "/stories",
        getState,
        dispatch,
        { method: id ? "PATCH" : "POST", body: JSON.stringify(input) },
      );
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unable to save story.");
    }
  },
);

export const deleteStory = createAsyncThunk<number, number, { state: RootState; dispatch: AppDispatch; rejectValue: string }>(
  "stories/delete",
  async (id, { getState, dispatch, rejectWithValue }) => {
    try {
      await authorizedRequest<void>(`/stories/${id}`, getState, dispatch, { method: "DELETE" });
      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unable to delete story.");
    }
  },
);

export const addContributor = createAsyncThunk<
  { storyId: number; user: Contributor },
  { storyId: number; userId?: number; email?: string },
  { state: RootState; dispatch: AppDispatch; rejectValue: string }
>(
  "stories/addContributor",
  async (input, { getState, dispatch, rejectWithValue }) => {
    try {
      const user = await authorizedRequest<Contributor>("/contributors", getState, dispatch, {
        method: "POST",
        body: JSON.stringify({ storyId: input.storyId, userId: input.userId, email: input.email }),
      });
      return { storyId: input.storyId, user };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unable to add contributor.");
    }
  },
);

export const removeContributor = createAsyncThunk<{ storyId: number; contributorId: number }, { storyId: number; contributorId: number }, { state: RootState; dispatch: AppDispatch; rejectValue: string }>(
  "stories/removeContributor",
  async (input, { getState, dispatch, rejectWithValue }) => {
    try {
      await authorizedRequest<void>(
        `/contributors/${input.contributorId}`,
        getState,
        dispatch,
        { method: "DELETE" },
      );
      return input;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unable to remove contributor.");
    }
  },
);

export const loadStoryDetails = createAsyncThunk<
  { storyId: number; comments: StoryComment[]; versions: StoryVersion[] },
  number,
  { state: RootState; dispatch: AppDispatch; rejectValue: string }
>("stories/loadDetails", async (storyId, { getState, dispatch, rejectWithValue }) => {
  try {
    const [comments, versions] = await Promise.all([
      authorizedRequest<StoryComment[]>(`/stories/${storyId}/comments`, getState, dispatch),
      authorizedRequest<StoryVersion[]>(`/stories/${storyId}/versions`, getState, dispatch),
    ]);
    return { storyId, comments, versions };
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : "Unable to load story details.");
  }
});

export const addComment = createAsyncThunk<
  StoryComment,
  { storyId: number; content: string },
  { state: RootState; dispatch: AppDispatch; rejectValue: string }
>("stories/addComment", async (input, { getState, dispatch, rejectWithValue }) => {
  try {
    return await authorizedRequest<StoryComment>(
      `/stories/${input.storyId}/comments`,
      getState,
      dispatch,
      { method: "POST", body: JSON.stringify({ content: input.content }) },
    );
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : "Unable to add comment.");
  }
});

const storiesSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {
    clearStoriesError(state) {
      state.error = null;
    },
    updateLocalStory(state, action: PayloadAction<Story>) {
      const index = state.items.findIndex((story) => story.id === action.payload.id);
      if (index >= 0) state.items[index] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadStories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadStories.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "idle";
      })
      .addCase(loadStories.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload ?? "Unable to load stories.";
      })
      .addCase(saveStory.pending, (state) => {
        state.status = "saving";
        state.error = null;
      })
      .addCase(saveStory.fulfilled, (state, action) => {
        const index = state.items.findIndex((story) => story.id === action.payload.id);
        if (index >= 0) state.items[index] = action.payload;
        else state.items.unshift(action.payload);
        state.status = "idle";
      })
      .addCase(saveStory.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload ?? "Unable to save story.";
      })
      .addCase(deleteStory.fulfilled, (state, action) => {
        state.items = state.items.filter((story) => story.id !== action.payload);
      })
      .addCase(deleteStory.rejected, (state, action) => {
        state.error = action.payload ?? "Unable to delete story.";
      })
      .addCase(addContributor.fulfilled, (state, action) => {
        const story = state.items.find((item) => item.id === action.payload.storyId);
        if (story && !story.contributors.some((user) => user.id === action.payload.user.id)) {
          story.contributors.push(action.payload.user);
        }
      })
      .addCase(addContributor.rejected, (state, action) => {
        state.error = action.payload ?? "Unable to add contributor.";
      })
      .addCase(removeContributor.fulfilled, (state, action) => {
        const story = state.items.find((item) => item.id === action.payload.storyId);
        if (story) {
          story.contributors = story.contributors.filter(
            (user) => user.contributorId !== action.payload.contributorId,
          );
        }
      })
      .addCase(removeContributor.rejected, (state, action) => {
        state.error = action.payload ?? "Unable to remove contributor.";
      })
      .addCase(loadStoryDetails.fulfilled, (state, action) => {
        state.comments[action.payload.storyId] = action.payload.comments;
        state.versions[action.payload.storyId] = action.payload.versions;
      })
      .addCase(loadStoryDetails.rejected, (state, action) => {
        state.error = action.payload ?? "Unable to load story details.";
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const comments = state.comments[action.payload.storyId] ?? [];
        comments.push(action.payload);
        state.comments[action.payload.storyId] = comments;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.error = action.payload ?? "Unable to add comment.";
      });
  },
});

export const { clearStoriesError, updateLocalStory } = storiesSlice.actions;
export default storiesSlice.reducer;
