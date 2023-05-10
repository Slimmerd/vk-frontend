import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/image`,
  withCredentials: true,
});

export const ImageAPI = {
  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await instance
      .post(`upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .catch((err) => {
        console.log("err", err.data);
        return { data: false };
      });
    return res.data;
  },
};
