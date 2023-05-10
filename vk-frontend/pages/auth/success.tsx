import React from "react";
import { useRouter } from "next/router";
import AuthLayout from "@/components/layout/AuthLayout";
import styles from "@/styles/Success.module.scss";

const Success = () => {
  const router = useRouter();

  const toLogin = () => {
    router.push("/auth/login");
  };

  return (
    <div className={styles.main}>
      <div className={styles.card}>
        <h1 className={styles.heading}>Успех 🎉</h1>
        <h2 className={styles.subHeading}>Вы успешно прошли регистрацию</h2>
        <p className={styles.description}>
          Чтобы войти в аккаунт, перейдите на страницу авторзиации
        </p>
        <button className={styles.button} onClick={() => toLogin()}>
          Перейти
        </button>
      </div>
    </div>
  );
};

Success.getLayout = AuthLayout;

export default Success;
