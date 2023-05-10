import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import dayjs from "dayjs";
import styles from "@/styles/Profile.module.scss";
import Image from "next/image";
import Post from "@/components/post";
import { useRouter } from "next/router";
import LoadingBlock from "@/components/loading/LoadingBlock";
import ErrorBlock from "@/components/error/ErrorBlock";
import { addFriend, removeFriend } from "@/redux/thunks/friendThunk";
import { fetchById } from "@/redux/thunks/userThumk";

const UserProfile = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const me = useSelector((state: RootState) => state.user);
  const id =
    router.query.id !== undefined ? parseInt(router.query.id as string) | 0 : 0;
  const isFriend = me.friends.find((user) => user.id === id);

  const user = useSelector((state: RootState) => state.friend);
  const date = dayjs(user?.dob).locale("ru").format("DD MMMM YYYY");

  const friendUpdate = () => {
    if (!!isFriend) {
      dispatch(removeFriend(id));
    } else {
      dispatch(addFriend(id));
    }
  };

  useEffect(() => {
    if (id !== 0) {
      if (Number(router.query.id) === me.id) {
        router.push("/profile");
      }

      dispatch(fetchById(id));
    }
  }, [router.query.id]);

  if (id === -1) {
    return <ErrorBlock />;
  }

  if (user.status === "loading") {
    return <LoadingBlock />;
  }

  return (
    <div className={styles.main}>
      <div className={styles.heading}>
        {/*Avatar*/}
        <div>
          <Image src={"/next.svg"} alt={"avatar"} height={150} width={150} />
        </div>
        <div>
          <h1>{user.name}</h1>
          {/*    Description */}
          <div className={styles.description}>
            <h2>Дата Рождения</h2>
            <p>{date}</p>
            <h2>Город</h2>
            <p>{user.city}</p>
            <h2>Вуз</h2>
            <p>{user.edu}</p>
          </div>
          {/*    Add/Delete friend */}
          {!!isFriend ? (
            <button
              className={styles["button--delete"]}
              onClick={() => friendUpdate()}
            >
              Удалить
            </button>
          ) : (
            <button
              className={styles["button--add"]}
              onClick={() => friendUpdate()}
            >
              Добавить
            </button>
          )}
        </div>
      </div>
      {/*    Posts*/}
      <div className={styles.posts}>
        {user.posts.map((post) => (
          <Post key={post.id} data={post} userID={me.id}  postType={1}/>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
