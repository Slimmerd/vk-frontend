import { createAsyncThunk } from "@reduxjs/toolkit";
import { FriendAPI } from "@/api/friendAPI";
import { PostAPI } from "@/api/postAPI";
import { removeUser } from "@/redux/userSlice";

export const addFriend = createAsyncThunk(
  "user/addFriend",
  async (friendID: number, thunkAPI) => {
    const response = await FriendAPI.addFriend(friendID);
    return response;
  }
);

export const removeFriend = createAsyncThunk(
  "user/removeFriend",
  async (friendID: number, thunkAPI) => {
    const response = await FriendAPI.removeFriend(friendID);
    return response;
  }
);

export const setFriendLike = createAsyncThunk(
  "friend/setLike",
  async (postID: number, thunkAPI) => {
    const response = await PostAPI.setLike(postID);
    return response;
  }
);

export const removeFriendLike = createAsyncThunk(
  "friend/removeLike",
  async (postID: number, thunkAPI) => {
    const response = await PostAPI.removeLike(postID);
    return response;
  }
);
