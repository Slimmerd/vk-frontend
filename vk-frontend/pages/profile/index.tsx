import React from "react";
import Image from "next/image";
import styles from "../../styles/Profile.module.scss";
import Post from "../../components/post";
import NewPost from "@/components/newPost/NewPost";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import dayjs from "dayjs";
import "dayjs/locale/ru";

const Profile = () => {
  const user = useSelector((state: RootState) => state.user);
  const date = dayjs(user.dob).locale("ru").format("DD MMMM YYYY");

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
        </div>
      </div>
      <NewPost />
      {/*    Posts*/}
      <div className={styles.posts}>
        {user.posts.map((post) => (
          <Post key={post.id} data={post} userID={user.id} postType={0} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
