import { useAppDispatch, useAppSelector } from "@/store";
import { save, selectChannel, write } from "@/store/chatStore";
import { ChatMessage } from "@/types/Chat.type";
import { useNavigate } from "react-router-dom";
import { uid } from "../helpers/uniqueId";
import { streamingChat } from "../services/chatService";

export default function useChat(channelId: string) {
  const channel = useAppSelector(selectChannel(channelId));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function createMessage(
    content: string,
    model: string,
    role: string,
    done = true
  ) {
    return {
      id: `m${uid()}`,
      role,
      content,
      model,
      created_at: Date.now(),
      done,
    };
  }

  async function sendMessage(content: string, model: string) {
    const message = createMessage(content, model, "user");
    await handleMessage(message);
    await handleChannelUpdate();
  }

  async function handleMessage(message: ChatMessage) {
    // Push user message
    dispatch(write({ channelId: channel.id, message }));

    await handleMessageResponse(message);
  }

  async function handleMessageResponse(userMessage: ChatMessage) {
    const response = await streamingChat(
      [...channel.messages, userMessage],
      userMessage.model
    );

    // Create message with empty content
    const responseMessage = await createMessage(
      "",
      userMessage.model,
      "assistant",
      false
    );

    let messageContent = "";

    for await (const chunk of response) {
      messageContent += chunk.message.content;

      dispatch(
        write({
          channelId: channel.id,
          message: {
            ...responseMessage,
            ...chunk,
            content: messageContent,
            created_at: chunk.created_at
              ? new Date(chunk.created_at).getTime()
              : responseMessage.created_at,
          },
        })
      );
    }
  }

  async function handleChannelUpdate() {
    if (channelId === "new") {
      const newChannelId = `c${uid()}`;
      await dispatch(save(newChannelId));
      return navigate(`/c/${newChannelId}`);
    }
  }

  return {
    channel,
    sendMessage,
  };
}
