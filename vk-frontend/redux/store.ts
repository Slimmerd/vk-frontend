import { configureStore } from "@reduxjs/toolkit";
import user from "@/redux/userSlice";
import { friendsSlice } from "@/redux/friendsSlice";
import feed from "@/redux/feedSlice";
import friend from "@/redux/friendSlice";

export const store = configureStore({
  reducer: {
    user,
    friend,
    feed,
    [friendsSlice.reducerPath]: friendsSlice.reducer,
  },
  middleware: (gDM) => gDM().concat(friendsSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
