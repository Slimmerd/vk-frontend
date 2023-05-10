import React, { useEffect, useState } from "react";
import Post from "../../components/post";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import LoadingBlock from "@/components/loading/LoadingBlock";
import styles from "@/styles/Feed.module.scss";
import { loadFeed } from "@/redux/thunks/feedThunk";

const Feed = () => {
  const [skip, setSkip] = useState<number>(0);
  const { id } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();
  const feed = useSelector((state: RootState) => state.feed);

  useEffect(() => {
    dispatch(loadFeed(skip));
  }, []);

  return (
    <div>
      {feed.status === "loading" && <LoadingBlock />}
      {feed.posts.length === 0 && (
        <div className={styles.empty}>
          <h1>Ваши друзья ничем не делились в последнее время 😢</h1>
        </div>
      )}
      {feed.posts.length > 0 &&
        feed.posts.map((post) => (
          <Post data={post} userID={id} key={post.id} postType={2} />
        ))}
    </div>
  );
};

export default Feed;
