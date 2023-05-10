import React, { useState } from "react";
import { Formik } from "formik";
import styles from "@/styles/Login.module.scss";
import InputField from "../../components/inputField";
import { loginValidator } from "@/utils/validators/loginValidator";
import { useRouter } from "next/router";
import AuthLayout from "@/components/layout/AuthLayout";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import ErrorBlock from "@/components/error/ErrorBlock";
import LoadingBlock from "@/components/loading/LoadingBlock";
import { login } from '@/redux/thunks/userThumk';

const Login = () => {
  const router = useRouter();
  const [isError, setError] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const pushRegister = () => {
    router.push("/auth/register");
  };

  return (
    <div className={styles.main}>
      <div className={styles.column}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validateOnChange={true}
          validationSchema={loginValidator}
          onSubmit={async (values) => {
            setError(false);
            dispatch(
              login({ email: values.email, password: values.password })
            ).then((res) => {
              if (res.payload !== undefined) {
                router.replace("/feed");
              } else {
                setError(true);
              }
            });
          }}
        >
          {({ isSubmitting, handleSubmit }) => (
            <form className={styles.form} onSubmit={handleSubmit}>
              <h1 className={styles.title}>Авторизация</h1>
              {isError && <ErrorBlock />}
              {isSubmitting && <LoadingBlock />}

              <InputField
                label={"Email"}
                name={"email"}
                type="email"
                placeholder={""}
              />
              <InputField
                label={"Пароль"}
                name={"password"}
                type="password"
                placeholder={""}
              />

              <button className={styles["button--green"]} type={"submit"}>
                Войти
              </button>
              <button
                className={styles.button}
                type={"button"}
                onClick={() => pushRegister()}
              >
                Зарегистироваться
              </button>
            </form>
          )}
        </Formik>
      </div>
      <div className={styles.column}>
        <div className={styles.description}>
          <h1>ВРАБОТЕ</h1>
          <p>
            Социальная сеть для тех кто работает и хочет расширить свой круг
            общения с людьми по цеху
          </p>
        </div>
      </div>
    </div>
  );
};

Login.getLayout = AuthLayout;

export default Login;
