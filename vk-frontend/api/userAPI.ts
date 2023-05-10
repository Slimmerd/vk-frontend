import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}`,
  withCredentials: true,
});

type RegisterPayloadT = {
  email: string;
  password: string;

  name: string;
  dob: Date;
  edu?: string;
  city: string;
};

export const UserAPI = {
  async fetchMe() {
    const res = await instance.get(`/user/me`);
    return res.data;
  },

  async fetchById(userID: number) {
    const res = await instance.get(`/user/byId/${userID}`).catch((err) => {
      console.log("err", err);
      return { data: false };
    });;
    return res.data;
  },

  async fetchByName(name: string) {
    const res = await instance.get(`/user/byName/${name}`);
    return res.data;
  },

  async login(email: string, password: string) {
    const res = await instance.post(`/auth/login`, {
      email: email,
      password: password,
    });
    return res.data;
  },

  async logout() {
    const res = await instance.post(`/auth/logout`);
    return res.data;
  },

  async register(registerPayload: RegisterPayloadT) {
    const res = await instance
      .post(`/user/register`, { ...registerPayload })
      .catch((err) => {
        console.log("err", err.data);
        return { data: false };
      });
    return res.data;
  },
};
