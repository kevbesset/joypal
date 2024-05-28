import { useAppSelector } from "@/store";
import { selectAvailableChannels } from "@/store/chatStore";
import { useState } from "react";

export default function useChannelSearch() {
  const [value, setValue] = useState<string>("");

  const search = value.toLowerCase();
  const channels = useAppSelector(selectAvailableChannels);

  const filteredChannels = channels.filter((channel) => {
    if (value === "") return true;

    const title = channel.title?.toLowerCase();

    if (
      typeof title?.indexOf(search) !== "undefined" &&
      title?.indexOf(search) >= 0
    )
      return true;

    return false;
  });

  return {
    value,
    setValue,
    channels: filteredChannels,
  };
}
