import React, { ReactNode } from "react";
import styles from "./ErrorBlock.module.scss";

const ErrorBlock = ({ children }: { children?: ReactNode }) => {
  return (
    <div className={styles.main}>
      <h1>Произошла ошибка</h1>
      {children !== null && children}
    </div>
  );
};

export default ErrorBlock;
