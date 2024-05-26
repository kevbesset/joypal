import chatStore from "@/store/chatStore";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import modelStore from "./store/modelStore";
import organizerStore from "./store/organizerStore";

const store = configureStore({
  reducer: {
    chat: chatStore,
    organizer: organizerStore,
    model: modelStore,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
