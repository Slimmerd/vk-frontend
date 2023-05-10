import axios from "axios";
import { CreatePostT } from "@/utils/types/post";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/posts`,
  withCredentials: true,
});

export const PostAPI = {

  async createPost(payload: CreatePostT) {
    const res = await instance.post(`create`, { ...payload }).catch((err) => {
      console.log("err", err.data);
      return { data: false };
    });
    return res.data;
  },

  async deletePost(postID: number) {
    const res = await instance
      .delete(`/delete`, {
        data: {
          id: postID,
        },
      })
      .catch((err) => {
        console.log("err", err.data);
        return { data: false };
      });
    return res.data;
  },

  async removeLike(postID: number) {
    const res = await instance
      .delete(`/removeLike`, {
        data: {
          id: postID,
        },
      })
      .catch((err) => {
        console.log("err", err.data);
        return { data: false };
      });
    return res.data;
  },

  async setLike(postID: number) {
    const res = await instance
      .put(`/setLike`, { id: postID })
      .catch((err) => {
        console.log("err", err.data);
        return { data: false };
      });

    return res.data;
  },
};
