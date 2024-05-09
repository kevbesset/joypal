import { useAppDispatch, useAppSelector } from "@/store";
import { update } from "@/store/chatSlice";
import { ChatChannel, ChatMessage } from "@/types/Chat.type";
import Ollama from "ollama/browser";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uid } from "../helpers/uniqueId";

export default function useChat(channelId?: string) {
  const navigate = useNavigate();
  const channels = useAppSelector((state) => state.chat.channels);

  const [uniqueId] = useState(uid());
  const [channel, setChannel] = useState<ChatChannel>();
  const [messageHistory, setMessageHistory] = useState<ChatMessage[]>(
    getDefaultMessageHistory()
  );
  const dispatch = useAppDispatch();

  function getDefaultMessageHistory() {
    return channels?.find((chan) => chan.id === channelId)?.messages || [];
  }

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
        created_at: Date.now(),
        done: false,
      },
    ]);

    for await (const chunk of response) {
      setMessageHistory((history) => {
        const nextHistory = [...history];

        const streamingMessage = nextHistory[nextHistory.length - 1];
        nextHistory[nextHistory.length - 1] = {
          ...streamingMessage,
          ...chunk,
          created_at: chunk.created_at
            ? new Date(chunk.created_at).getTime()
            : streamingMessage.created_at,
          content: streamingMessage.content + chunk.message.content,
        };

        return nextHistory;
      });
    }
  }

  // If channelId is not found, redirect to "new chat"
  useEffect(() => {
    setChannel(channels?.find((chan) => chan.id === channelId));
    if (channelId && !channels.find((chan) => chan.id === channelId)) {
      navigate("/");
    }
  }, [channelId, channels, navigate]);

  useEffect(() => {
    if (messageHistory.length) {
      dispatch(
        update({ channelId: channelId || uniqueId, messages: messageHistory })
      );
    }
  }, [messageHistory, channelId, dispatch, uniqueId]);

  return {
    channel,
    channelId: channelId || uniqueId,
    messages: messageHistory,
    sendMessage,
  };
}
