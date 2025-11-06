import { configureStore } from "@reduxjs/toolkit";
import SlicePost from "../slices/SlicePost";

export const store = configureStore({
  reducer: {
    post: SlicePost,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
