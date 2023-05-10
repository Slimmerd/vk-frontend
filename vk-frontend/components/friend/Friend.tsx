import React from "react";
import styles from "./Friend.module.scss";
import Image from "next/image";
import Link from "next/link";
import { User } from "@/utils/types/post";
import { IoPersonAdd, IoPersonRemove, IoSend } from "react-icons/io5";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addFriend, removeFriend } from "@/redux/thunks/friendThunk";

const Friend = ({
  data,
  status,
  isFriend = false,
}: {
  data: User;
  status: string;
  isFriend?: boolean;
}) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const friendUpdate = () => {
    if (isFriend) {
      dispatch(removeFriend(data.id));
    } else {
      dispatch(addFriend(data.id));
    }
  };

  const sendMsg = (id: number) => {
    router.push(`/msg/${id}`);
  };

  return (
    <Link href={`/profile/${data.id}`}>
      <div className={styles.main}>
        <div className={styles.content}>
          <Image
            src={"/next.svg"}
            className={styles.avatar}
            alt={"avatar"}
            height={150}
            width={150}
          />
          <h1>{data.name}</h1>
          <div>
            {isFriend && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  sendMsg(data.id);
                }}
              >
                <IoSend />
              </button>
            )}
            <button
              disabled={status === "loading"}
              onClick={(e) => {
                e.preventDefault();
                friendUpdate();
              }}
            >
              {isFriend ? <IoPersonRemove /> : <IoPersonAdd />}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Friend;
