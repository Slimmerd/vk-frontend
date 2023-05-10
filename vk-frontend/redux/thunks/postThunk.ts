import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostAPI } from "@/api/postAPI";
import { CreatePostT } from "@/utils/types/post";

export const createPost = createAsyncThunk(
  "user/createPost",
  async (payload: CreatePostT, thunkAPI) => {
    const response = await PostAPI.createPost(payload);
    return response;
  }
);

export const deletePost = createAsyncThunk(
  "user/deletePost",
  async (postID: number, thunkAPI) => {
    const response = await PostAPI.deletePost(postID);
    return response;
  }
);

// Likes

export const setLike = createAsyncThunk(
  "user/setLike",
  async (postID: number, thunkAPI) => {
    const response = await PostAPI.setLike(postID);
    return response;
  }
);

export const removeLike = createAsyncThunk(
  "user/removeLike",
  async (postID: number, thunkAPI) => {
    const response = await PostAPI.removeLike(postID);
    return response;
  }
);
