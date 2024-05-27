import { useAppDispatch, useAppSelector } from "@/store";
import { change, populate } from "@/store/modelStore";
import ollama from "ollama/browser";
import { useEffect } from "react";

export default function useModel() {
  const model = useAppSelector((state) => state.model.currentModel);
  const modelList = useAppSelector((state) => state.model.models);
  const dispatch = useAppDispatch();
  const modelObject = modelList?.find((m) => m.name === model);

  async function populateModelList() {
    // Get models from Ollama
    const ollamaList = await ollama.list();
    if (ollamaList.models) {
      console.log(ollamaList.models);
      dispatch(populate(ollamaList.models));
    }
  }

  async function setModel(newModel: string) {
    dispatch(change(newModel));
  }

  useEffect(() => {
    if (!modelList?.length) {
      populateModelList();
    }
  }, [modelList]);

  return {
    models: modelList,
    model,
    modelObject,
    setModel,
  };
}
