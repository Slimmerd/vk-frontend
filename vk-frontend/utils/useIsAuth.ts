import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '@/redux/store';
import { fetchMe } from '@/redux/thunks/userThumk';

export const useIsAuth = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMe());
  }, []);

  useEffect(() => {
    console.log("feed", user.id);
    console.log("feed", user.status);

    if (user.status === "error" && user.id === -1) {
      router.replace("/auth/login");
    }
  }, [user]);

  return user;
};

export const useLoginIsAuth = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMe());
  }, []);

  useEffect(() => {
    console.log("auth", user.id);
    if (
      user.id !== -1 &&
      (router.pathname === "/auth/login" ||
        router.pathname === "/auth/register")
    ) {
      router.replace("/feed");
    }
  }, [user]);

  return user;
};
