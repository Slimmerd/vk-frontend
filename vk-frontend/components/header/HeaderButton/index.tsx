import React from "react";
import Link from "next/link";
import styles from "./HeaderButton.module.scss";

const HeaderButton = ({
  link,
  text,
  icon,
}: {
  link: string;
  text: string;
  icon: JSX.Element;
}) => {
  return (
    <div className={styles.main}>
      <Link href={link}>
        {icon} <span>{text}</span>
      </Link>
    </div>
  );
};

export default HeaderButton;
