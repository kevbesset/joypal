import { useAppDispatch, useAppSelector } from "@/store";
import {
  save,
  saveAsTemplate,
  selectChannel,
  update,
  write,
} from "@/store/chatStore";
import { ChatMessage, RTCPrompt } from "@/types/Chat.type";
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

  async function sendMessage(content: RTCPrompt, model: string) {
    const messageList = [...channel.messages];

    if (content?.role) {
      const systemMessage = createMessage(content.role, model, "system");
      await handleMessage(systemMessage);
      messageList.push(systemMessage);
    }

    const message = createMessage(content.task, model, "user");
    await handleMessage(message);
    messageList.push(message);

    await handleMessageResponse(messageList, model);

    await handleChannelUpdate();
  }

  async function saveTemplate(content: RTCPrompt, model: string) {
    const messageList: ChatMessage[] = [];

    if (content?.role) {
      const systemMessage = createMessage(content.role, model, "system");
      messageList.push(systemMessage);
    }

    const message = createMessage(content.task, model, "user");
    messageList.push(message);

    dispatch(
      saveAsTemplate({
        id: `t${uid()}`,
        title: "New template",
        messages: messageList,
      })
    );
  }

  async function handleMessage(message: ChatMessage) {
    // Push user message
    await dispatch(write({ channelId: channel.id, message }));
  }

  async function handleMessageResponse(messages: ChatMessage[], model: string) {
    // Create message with empty content
    const responseMessage = await createMessage("", model, "assistant", false);

    let messageContent = "";

    try {
      const response = await streamingChat(messages, model);
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
    } catch (error) {
      dispatch(
        write({
          channelId: channel.id,
          message: {
            ...responseMessage,
            role: "error",
            content: (error as Error).message,
            done: true,
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

  async function retry(message: ChatMessage) {
    const messageIndex = channel.messages.findIndex((m) => m.id === message.id);

    if (messageIndex >= 0) {
      const previousMessages = channel.messages.slice(0, messageIndex);
      await dispatch(
        update({
          ...channel,
          messages: previousMessages,
        })
      );

      await handleMessageResponse(previousMessages, message.model);
    }
  }

  async function edit(message: ChatMessage) {
    const messageIndex = channel.messages.findIndex((m) => m.id === message.id);

    if (messageIndex >= 0) {
      const previousMessages = channel.messages.slice(0, messageIndex);
      await dispatch(
        update({
          ...channel,
          messages: previousMessages,
        })
      );

      await sendMessage({ task: message.content }, message.model);
    }
  }

  async function download() {
    const json = JSON.stringify(channel, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Créer un élément <a> pour télécharger le fichier
    const a = document.createElement("a");
    a.href = url;
    a.download = `channel-${channel.id}.json`;

    // Ajouter l'élément <a> au document et cliquer dessus pour démarrer le téléchargement
    document.body.appendChild(a);
    a.click();

    // Nettoyer après le téléchargement
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  return {
    channel,
    sendMessage,
    saveTemplate,
    retry,
    edit,
    download,
  };
}
