import React, { useState } from "react";
import styles from "../../styles/Register.module.scss";
import InputField from "../../components/inputField";
import { Formik } from "formik";
import { registerValidator } from "@/utils/validators/registerValidator";
import { UserAPI } from "@/api/userAPI";
import { useRouter } from "next/router";
import AuthLayout from "@/components/layout/AuthLayout";

const Register = () => {
  const router = useRouter();
  const [isError, setError] = useState<boolean>(false);

  return (
    <div className={styles.main}>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          dob: new Date(Date.now()),
          city: "",
          edu: "",
        }}
        validateOnChange={true}
        validationSchema={registerValidator}
        onSubmit={async (values) => {
          setError(false);
          // setLoading(true)
          const res = await UserAPI.register({
            email: values.email,
            password: values.password,
            name: values.name,
            dob: values.dob,
            edu: values.edu,
            city: values.city,
          });
          // setFalse(false)

          if (res == true) {
            router.push("/auth/success");
          } else {
            setError(true);
          }
        }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={styles.title}>Регистрация</h1>
            {isError && <h1>Произошла ошибка</h1>}

            <InputField
              label={"Имя"}
              name={"name"}
              type="name"
              placeholder={""}
            />

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

            <InputField
              label={"День Рождения"}
              name={"dob"}
              type="date"
              placeholder={""}
            />
            <InputField
              label={"Город"}
              name={"city"}
              type="text"
              placeholder={""}
            />
            <InputField
              label={"Вуз"}
              name={"edu"}
              type="text"
              placeholder={""}
            />

            {isSubmitting && <h1>Загрузка</h1>}
            <button
              type={'submit'}
              className={styles.button}
              disabled={isSubmitting}
            >
              Зарегистрироваться
            </button>
          </form>
        )}
      </Formik>

    </div>
  );
};

Register.getLayout = AuthLayout;

export default Register;
