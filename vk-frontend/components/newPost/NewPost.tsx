import React, { useEffect, useState } from "react";
import styles from "./NewPost.module.scss";
import Image from "next/image";
import { IoAttach, IoSend } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { AppDispatch } from "@/redux/store";
import { createPost } from "@/redux/thunks/postThunk";
import { postValidator } from "@/utils/validators/postValidator";
import TextareaField from "../textareaField";
import { ImageAPI } from "@/api/imageAPI";
import ErrorBlock from "@/components/error/ErrorBlock";

const NewPost = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [fileLinks, setFileLinks] = useState<string[]>([]);
  const [isUploaded, setUploaded] = useState<boolean | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files![0];
    await ImageAPI.uploadImage(selectedFile).then((res) => {
      if (res === false) {
        setUploaded(false);
      } else {
        setFileLinks([...fileLinks, res]);
        setUploaded(true);
      }
    });
  };

  return (
    <div className={styles.main}>
      <Formik
        initialValues={{ content: "", attachments: [] }}
        validateOnChange={true}
        validationSchema={postValidator}
        onSubmit={async (values, { resetForm }) => {
          dispatch(
            createPost({
              content: values.content,
              attachments: fileLinks,
            })
          ).then((res) => {
            if (res.payload !== undefined) {
              resetForm();
            }
          });
        }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Image src={"/next.svg"} alt={"avatar"} height={35} width={35} />

            <TextareaField name={"content"} placeholder={""} />

            <label
              className={
                isUploaded ? styles["fileInput--success"] : styles.fileInput
              }
            >
              <IoAttach />
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.gif"
                disabled={isSubmitting}
                onChange={handleFileChange}
              />
            </label>

            <button type={"submit"} disabled={isSubmitting}>
              <IoSend />
            </button>
          </form>
        )}
      </Formik>
            {isUploaded == false && (
              <ErrorBlock>
               <p>Проверь чтобы файл имел формат один из
                 png,jpeg,jpg. Также размер файла не должен превышать 4 МБ</p>
               </ErrorBlock>
            )}
    </div>
  );
};

export default NewPost;
