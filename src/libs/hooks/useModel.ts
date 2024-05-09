import { Model } from "@/types/Model.type";
import ollama from "ollama/browser";
import { useEffect, useState } from "react";

export default function useModel() {
  const [modelList, setModelList] = useState<Model[]>();

  async function populateModelList() {
    const ollamaList = await ollama.list();
    setModelList(ollamaList.models);
  }

  useEffect(() => {
    if (!modelList) {
      populateModelList();
    }
  }, [modelList]);

  return {
    models: modelList,
  };
}
