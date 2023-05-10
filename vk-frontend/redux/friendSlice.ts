import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { PostT, User } from "@/utils/types/post";
import { fetchById } from "@/redux/thunks/userThumk";
import { removeFriendLike, setFriendLike } from "@/redux/thunks/friendThunk";

export interface FriendState {
  id: number;
  avatar_url?: string;
  name: string;
  email: string;
  dob: string;
  edu?: string;
  city: string;
  friends: User[];
  posts: PostT[];
  status: string;
}

const initialState: FriendState = {
  id: -1,
  avatar_url: "",
  name: "",
  email: "",
  dob: "",
  edu: "",
  city: "",
  friends: [],
  posts: [],
  status: "",
};

export const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchById.fulfilled,
        (state, action: PayloadAction<FriendState>) => {
          return {
            ...action.payload,
            status: "success",
          };
        }
      )
      .addCase(fetchById.rejected, (state) => {
        state.status = "error";
      });

    builder
      .addCase(setFriendLike.pending, (state) => {
        state.status = "loadingLike";
      })
      .addCase(setFriendLike.fulfilled, (state, action: PayloadAction<PostT>) => {
        const updatedPosts = [...state.posts];
        const postIndex = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        updatedPosts[postIndex] = action.payload;

        return {
          ...state,
          posts: updatedPosts,
          status: "successLike",
        };
      })
      .addCase(setFriendLike.rejected, (state) => {
        state.status = "errorLike";
      });

    builder
      .addCase(removeFriendLike.pending, (state) => {
        state.status = "loadingLike";
      })
      .addCase(removeFriendLike.fulfilled, (state, action: PayloadAction<PostT>) => {
        const updatedPosts = [...state.posts];
        const postIndex = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        updatedPosts[postIndex] = action.payload;
        return {
          ...state,
          posts: updatedPosts,
          status: "successLike",
        };
      })
      .addCase(removeFriendLike.rejected, (state) => {
        state.status = "errorLike";
      });
  },
});

export const {} = friendSlice.actions;

export default friendSlice.reducer;
