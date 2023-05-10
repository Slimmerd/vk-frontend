import { createAsyncThunk } from "@reduxjs/toolkit";
import { FeedAPI } from "@/api/feedAPI";
import { PostAPI } from '@/api/postAPI';

export const loadFeed = createAsyncThunk(
  "feed/load",
  async (skip: number = 0, thunkAPI) => {
    const response = await FeedAPI.feed(skip);
    return response;
  }
);

export const setFeedLike = createAsyncThunk(
  "feed/setLike",
  async (postID: number, thunkAPI) => {
    const response = await PostAPI.setLike(postID);
    return response;
  }
);

export const removeFeedLike = createAsyncThunk(
  "feed/removeLike",
  async (postID: number, thunkAPI) => {
    const response = await PostAPI.removeLike(postID);
    return response;
  }
);
