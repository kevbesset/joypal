import { ChatMessage } from "@/types/Chat.type";
import Ollama from "ollama/browser";

export async function streamingChat(messageList: ChatMessage[], model: string) {
  switch (model) {
    default:
      // Handle Ollama by default
      return await Ollama.chat({
        model,
        messages: messageList.map(({ role, content }) => ({
          role,
          content,
        })),
        stream: true,
      });
  }
}
