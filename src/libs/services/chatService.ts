import { ChatMessage } from "@/types/Chat.type";
import Ollama, { Message } from "ollama/browser";

export async function streamingChat(messageList: ChatMessage[], model: string) {
  switch (model) {
    default:
      // Handle Ollama by default
      return await Ollama.chat({
        model,
        messages: messageList
          .filter((msg) => msg.role !== "error")
          .map(({ role, content }) => ({
            role,
            content,
          })),
        stream: true,
      });
  }
}

export async function chat(messageList: Message[], model: string) {
  switch (model) {
    default:
      // Handle Ollama by default
      return await Ollama.chat({
        model,
        messages: messageList.map(({ role, content }) => ({
          role,
          content,
        })),
        stream: false,
      });
  }
}
