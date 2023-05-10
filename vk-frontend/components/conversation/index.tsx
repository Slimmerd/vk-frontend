import React from "react";
import styles from "./Conversation.module.scss";
import Image from "next/image";
import Link from "next/link";

const Conversation = () => {
  return (
    <Link href={""}>
      <div className={styles.main}>
        <Image
          src={"/next.svg"}
          className={styles.avatar}
          alt={"avatar"}
          height={54}
          width={54}
        />
        <div className={styles.content}>
          <div className={styles.heading}>
            <h1>Alex Alex</h1>
            <p>DATE</p>
          </div>
          <div className={styles.text}>
            <span>You: </span>
            <span>Text</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Conversation;
