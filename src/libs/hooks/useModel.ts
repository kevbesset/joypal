import { Model } from "@/types/Model.type";
import ollama from "ollama/browser";
import { useEffect, useState } from "react";
const DEFAULT_MODEL = "llama3:latest";

export default function useModel() {
  const [model, setModel] = useState<string>(DEFAULT_MODEL);
  const [modelList, setModelList] = useState<Model[]>();

  async function populateModelList() {
    // Get models from Ollama
    const ollamaList = await ollama.list();
    if (ollamaList.models) {
      setModelList(ollamaList.models);
    }
  }

  useEffect(() => {
    if (!modelList) {
      populateModelList();
    }
  }, [modelList]);

  return {
    models: modelList,
    model,
    setModel,
  };
}
