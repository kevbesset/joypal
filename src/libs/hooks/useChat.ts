import { ChatMessage } from "@/types/Chat.type";
import Ollama from "ollama/browser";
import { useState } from "react";

export default function useChat() {
  const [messageHistory, setMessageHistory] = useState<ChatMessage[]>([]);

  async function sendMessage(message: ChatMessage) {
    // Add message to the list
    setMessageHistory((history) => [...history, message]);

    // Call API to get the message response
    const response = await Ollama.chat({
      model: message.model,
      messages: [...messageHistory, message],
      stream: true,
    });

    // Handle the response stream
    setMessageHistory((history) => [
      ...history,
      {
        role: "assistant",
        content: "",
        model: message.model,
        created_at: new Date(),
        done: false,
      },
    ]);
    for await (const chunk of response) {
      setMessageHistory((history) => {
        const nextHistory = [...history];

        const streamingMessage = nextHistory[nextHistory.length - 1];
        nextHistory[nextHistory.length - 1] = {
          ...streamingMessage,
          content: streamingMessage.content + chunk.message.content,
          done: chunk.done,
          duration: Math.round((chunk.total_duration || 0) / 1000000),
        };

        return nextHistory;
      });
    }
  }

  return {
    messages: messageHistory,
    sendMessage,
  };
}
