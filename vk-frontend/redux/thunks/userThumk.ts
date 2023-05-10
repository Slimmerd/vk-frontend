import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserAPI } from "@/api/userAPI";
import { removeUser } from "@/redux/userSlice";

export const fetchById = createAsyncThunk(
  "friend/fetchById",
  async (id: number, thunkAPI) => {
    const response = await UserAPI.fetchById(id);
    return response;
  }
);

export const fetchMe = createAsyncThunk("user/fetchMe", async (thunkAPI) => {
  const response = await UserAPI.fetchMe();
  return response;
});

export const login = createAsyncThunk(
  "user/login",
  async (payload: { email: string; password: string }, thunkAPI) => {
    const response = await UserAPI.login(payload.email, payload.password);
    return response;
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async ( thunkAPI) => {
    const response = await UserAPI.logout();
    removeUser();
    return response;
  }
);