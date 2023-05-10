import React from "react";
import styles from "@/styles/Friends.module.scss";
import Friend from "@/components/friend/Friend";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetRecommendationsQuery } from "@/redux/friendsSlice";

const Friends = () => {
  const { friends, status } = useSelector((state: RootState) => state.user);
  const { data: recData, isError, isLoading } = useGetRecommendationsQuery();

  return (
    <div className={styles.main}>
      <h1>Друзья:</h1>
      {friends.length === 0 ? (
        <div className={styles.empty}>
          <h1>К сожалению у вас пока нет друзей 😢</h1>
        </div>
      ) : (
        <div className={styles.list}>
          {friends.map((friend) => (
            <Friend
              key={friend.id}
              data={friend}
              isFriend={true}
              status={status}
            />
          ))}
        </div>
      )}

      {recData && recData.length > 0 && (
        <>
          <h1>Возможно вы знакомы:</h1>
          <div className={styles.list}>
            {recData.map((newFriend) => (
              <Friend key={newFriend.id} data={newFriend} status={status} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Friends;
