import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { fetchMe, login } from "@/redux/thunks/userThumk";
import {
  createPost,
  deletePost,
  removeLike,
  setLike,
} from "@/redux/thunks/postThunk";
import { PostT, User } from "@/utils/types/post";
import { addFriend, removeFriend } from "@/redux/thunks/friendThunk";

export interface UserState {
  id: number;
  avatar_url?: string;
  name: string;
  email: string;
  dob: string;
  edu?: string;
  city: string;
  posts: PostT[];
  friends: User[];
  status: string;
}

const initialState: UserState = {
  id: -1,
  avatar_url: "",
  name: "",
  email: "",
  dob: "",
  edu: "",
  city: "",
  posts: [],
  friends: [],
  status: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeUser: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMe.fulfilled, (state, action: PayloadAction<UserState>) => {
        return {
          ...action.payload,
          status: "success",
        };
      })
      .addCase(fetchMe.rejected, (state) => {
        state.status = "error";
      });

    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<UserState>) => {
        return {
          ...action.payload,
          status: "success",
        };
      })
      .addCase(login.rejected, (state) => {
        state.status = "error";
      });

    builder
      .addCase(createPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<PostT>) => {
        return {
          ...state,
          posts: [action.payload, ...state.posts],
          status: "success",
        };
      })
      .addCase(createPost.rejected, (state) => {
        state.status = "error";
      });

    builder
      .addCase(deletePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deletePost.fulfilled,
        (state, action: PayloadAction<UserState>) => {
          const filteredPosts = state.posts.filter(
            (post) => post.id !== action.payload.id
          );

          return {
            ...state,
            posts: filteredPosts,
            status: "success",
          };
        }
      )
      .addCase(deletePost.rejected, (state) => {
        state.status = "error";
      });

    builder
      .addCase(setLike.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setLike.fulfilled, (state, action: PayloadAction<PostT>) => {
        const updatedPosts = [...state.posts];
        const postIndex = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        updatedPosts[postIndex] = action.payload;

        return {
          ...state,
          posts: updatedPosts,
          status: "success",
        };
      })
      .addCase(setLike.rejected, (state) => {
        state.status = "error";
      });

    builder
      .addCase(removeLike.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeLike.fulfilled, (state, action: PayloadAction<PostT>) => {
        const updatedPosts = [...state.posts];
        const postIndex = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        updatedPosts[postIndex] = action.payload;

        return {
          ...state,
          posts: updatedPosts,
          status: "success",
        };
      })
      .addCase(removeLike.rejected, (state) => {
        state.status = "error";
      });

    builder
      .addCase(addFriend.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addFriend.fulfilled, (state, action: PayloadAction<User[]>) => {
        return {
          ...state,
          friends: action.payload,
          status: "success",
        };
      })
      .addCase(addFriend.rejected, (state) => {
        state.status = "error";
      });

    builder
      .addCase(removeFriend.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        removeFriend.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          return {
            ...state,
            friends: action.payload,
            status: "success",
          };
        }
      )
      .addCase(removeFriend.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { removeUser } = userSlice.actions;

export default userSlice.reducer;
