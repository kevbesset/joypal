import ollama, { ModelResponse } from "ollama/browser";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import bem from "react-bemthis";
import styles from "./Demo.module.scss";

const { block, element } = bem(styles);

type Message = {
  role: string;
  content: string;
  model?: string;
};

export default function Demo() {
  const [promptValue, setPromptValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [nextMessage, setNextMessage] = useState<Message>();
  const [promptRow, setPromptRow] = useState(1);
  const [list, setList] = useState<ModelResponse[]>();
  const [currentModel, setCurrentModel] = useState("llama3:latest");

  function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setPromptValue(event.target.value);
  }

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    setCurrentModel(event.target.value);
  }

  function resetPrompt() {
    setPromptValue("");
    setPromptRow(1);
  }

  async function fetchList() {
    if (!list) {
      const ollamaList = await ollama.list();
      setList(ollamaList.models);

      if (!currentModel) {
        const llama3LatestModel = ollamaList.models.find(
          (model: ModelResponse) => model.name === "llama3:latest"
        );
        if (ollamaList.models.length === 0) {
          throw new Error("You need to install models in Ollama before");
        } else if (llama3LatestModel) {
          setCurrentModel(llama3LatestModel.name);
        } else {
          setCurrentModel(ollamaList.models[0].name);
        }
      }
    }
  }

  async function handleSubmit(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (!event.shiftKey && event.code === "Enter") {
      resetPrompt();
      event.preventDefault();

      if (promptValue) {
        const message = {
          role: "user",
          content: promptValue,
          model: currentModel,
        };
        setMessages((currentMessages) => [...currentMessages, message]);

        const response = await ollama.chat({
          model: currentModel,
          messages: [...messages, message],
          stream: true,
        });
        for await (const responseChunk of response) {
          setNextMessage((msg) => {
            const content = msg?.content
              ? msg.content + responseChunk.message.content
              : responseChunk.message.content;
            if (responseChunk.done) {
              setMessages((currentMessages) => [
                ...currentMessages,
                {
                  ...responseChunk.message,
                  ...msg,
                  content,
                  model: currentModel,
                },
              ]);
            }
            return {
              ...responseChunk.message,
              ...msg,
              content,
            };
          });

          if (responseChunk.done) {
            setNextMessage(undefined);
          }
        }
      }
    } else if (event.code === "Enter") {
      setPromptRow(promptRow + 1);
    }
  }

  useEffect(() => {
    fetchList();
  });

  return (
    <main className={block()}>
      <div className={element("body")}>
        <div>
          {list && (
            <>
              <label>Model: </label>
              <select value={currentModel} onChange={handleSelectChange}>
                {list?.map((model) => (
                  <option key={model.name} value={model.name}>
                    {model.name}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
        {currentModel && (
          <div className={element("wrapper")}>
            <textarea
              name="prompt"
              id="prompt"
              className={element("prompt")}
              autoComplete="off"
              autoFocus
              rows={promptRow}
              value={promptValue}
              onKeyDown={handleSubmit}
              onChange={handleInputChange}
              placeholder="Comment puis-je vous aider aujourd'hui ?"
            />
            <ul>
              {messages.map((message, messageIndex) => (
                <li className={element("message")} key={messageIndex}>
                  <h3 className={element("author")}>
                    {message.role === "assistant"
                      ? message.model
                      : message.role}
                  </h3>
                  <p className={element("messageContent")}>{message.content}</p>
                </li>
              ))}
              {nextMessage && (
                <li className={element("message")}>
                  <h3 className={element("author")}>{currentModel}</h3>
                  <p className={element("messageContent")}>
                    {nextMessage.content}
                  </p>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
