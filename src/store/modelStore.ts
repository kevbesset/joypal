import { getFromStorage, setFromStorage } from "@/libs/helpers/storage";
import { Model } from "@/types/Model.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ModelState = {
  currentModel: string;
  models: Model[];
};

const initialState: ModelState = {
  currentModel: getFromStorage("default_model"),
  models: [],
};

export const modelStore = createSlice({
  name: "model",
  initialState,
  reducers: {
    populate: (state, action: PayloadAction<Model[]>) => {
      state.models = action.payload;

      if (!state.currentModel) {
        state.currentModel = action.payload[0].name;
      }
    },
    change: (state, action: PayloadAction<string>) => {
      state.currentModel = action.payload;
    },
    changeDefault: (state, action: PayloadAction<string>) => {
      state.currentModel = action.payload;
      setFromStorage("default_model", action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { populate, change, changeDefault } = modelStore.actions;

export default modelStore.reducer;
