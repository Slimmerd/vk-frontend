import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/feed`,
  withCredentials: true,
});


export const FeedAPI = {
  async feed(skip: number = 0) {
    const res = await instance.get(`${skip}`, {}).catch((err) => {
      console.log("err", err.data);
      return { data: false };
    });
    return res.data;
  },
}