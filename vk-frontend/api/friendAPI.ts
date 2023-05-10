import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/friends`,
  withCredentials: true,
});

export const FriendAPI = {
  async addFriend(friendID: number) {
    const res = await instance
      .post(`add`, { friendID: friendID })
      .catch((err) => {
        console.log("err", err.data);
        return { data: false };
      });
    return res.data;
  },

  async removeFriend(friendID: number) {
    const res = await instance
      .delete(`/remove`, {
        data: {
          friendID: friendID,
        },
      })
      .catch((err) => {
        console.log("err", err.data);
        return { data: false };
      });
    return res.data;
  },
};
