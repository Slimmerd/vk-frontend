import React from "react";
import styles from "./Post.module.scss";
import Image from "next/image";
import { IoHeart } from "react-icons/io5";
import { PostT } from "@/utils/types/post";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useDispatch } from "react-redux";
import { removeLike, setLike } from "@/redux/thunks/postThunk";
import { AppDispatch } from "@/redux/store";
import debounce from "lodash.debounce";
import { removeFriendLike, setFriendLike } from "@/redux/thunks/friendThunk";
import { removeFeedLike, setFeedLike } from "@/redux/thunks/feedThunk";

const Post = ({
  data,
  userID,
  postType = 0,
}: {
  data: PostT;
  userID: number;
  postType?: number;
}) => {
  const date = dayjs(data.date).locale("ru").format("DD MMMM HH:mm");
  const dispatch = useDispatch<AppDispatch>();

  // const likePost = useCallback(debounce((query) =>  dispatch(setLike(id)), 800), [])
  const isLiked = data.like.find((like) => like.id === userID);
  const likePost = debounce((id) => {
    switch (postType) {
      case 0:
        if (isLiked) {
          dispatch(removeLike(id));
        } else {
          dispatch(setLike(id));
        }
        break;
      case 1:
        if (isLiked) {
          dispatch(removeFriendLike(id));
        } else {
          dispatch(setFriendLike(id));
        }
        break;
      case 2:
        if (isLiked) {
          dispatch(removeFeedLike(id));
        } else {
          dispatch(setFeedLike(id));
        }
        break;
      default:
        throw new Error("PostType error");
    }
  }, 300);

  return (
    <div className={styles.main}>
      <div className={styles.heading}>
        <div className={styles.image}>
          <Image src={"/next.svg"} alt={"avatar"} height={34} width={34} />
        </div>
        <div>
          <h1>{data.author.name}</h1>
          <p>{date}</p>
        </div>
      </div>
      <div className={styles.text}>{data.content}</div>
      {data.attachments.length > 0 && (
        <div className={styles.attachments}>
          {data.attachments.map((img, i) => (
            <Image
              alt={"attachment"}
              src={`${img}`}
              fill
              style={{ objectFit: "contain" }}
              key={i}
            />
          ))}
        </div>
      )}
      <div>
        <button
          className={isLiked ? styles["button--liked"] : styles.button}
          onClick={() => likePost(data.id)}
        >
          <IoHeart />
          <div className={styles.count}>{data.like.length}</div>
        </button>
      </div>
    </div>
  );
};

export default Post;
