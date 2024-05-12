import { ChatChannel } from "@/types/Chat.type";

export function sortChannels(channelA: ChatChannel, channelB: ChatChannel) {
  const lastMessageA = channelA.messages[channelA.messages.length - 1];
  const lastMessageB = channelB.messages[channelB.messages.length - 1];

  return lastMessageB?.created_at - lastMessageA?.created_at;
}
