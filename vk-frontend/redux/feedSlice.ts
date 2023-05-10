import { PostT } from "@/utils/types/post";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import {
  loadFeed,
  removeFeedLike,
  setFeedLike,
} from "@/redux/thunks/feedThunk";

export interface FeedState {
  posts: PostT[];
  status: string;
}

const initialState: FeedState = {
  posts: [],
  status: "",
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFeed.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        loadFeed.fulfilled,
        (state, action: PayloadAction<PostT[]>) => {
          return {
            posts: action.payload,
            status: "success",
          };
        }
      )
      .addCase(loadFeed.rejected, (state) => {
        state.status = "error";
      });

    builder
      .addCase(setFeedLike.pending, (state) => {
        state.status = "loadingLike";
      })
      .addCase(setFeedLike.fulfilled, (state, action: PayloadAction<PostT>) => {
        const updatedPosts = [...state.posts];
        const postIndex = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        updatedPosts[postIndex] = action.payload;

        return {
          posts: updatedPosts,
          status: "successLike",
        };
      })
      .addCase(setFeedLike.rejected, (state) => {
        state.status = "errorLike";
      });

    builder
      .addCase(removeFeedLike.pending, (state) => {
        state.status = "loadingLike";
      })
      .addCase(
        removeFeedLike.fulfilled,
        (state, action: PayloadAction<PostT>) => {
          const updatedPosts = [...state.posts];
          const postIndex = state.posts.findIndex(
            (post) => post.id === action.payload.id
          );
          updatedPosts[postIndex] = action.payload;
          return {
            posts: updatedPosts,
            status: "successLike",
          };
        }
      )
      .addCase(removeFeedLike.rejected, (state) => {
        state.status = "errorLike";
      });
  },
});

export const {} = feedSlice.actions;

export default feedSlice.reducer;
