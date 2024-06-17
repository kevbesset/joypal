import chatStore from "@/store/chatStore";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import eventStore from "./store/eventStore";
import modelStore from "./store/modelStore";

const store = configureStore({
  reducer: {
    chat: chatStore,
    model: modelStore,
    event: eventStore,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
