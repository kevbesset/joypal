import { sortChannels } from "@/libs/helpers/sort";
import { useAppSelector } from "@/store";
import { selectAvailableChannels } from "@/store/chatSlice";
import bem from "react-bemthis";
import { useParams } from "react-router-dom";
import ChannelCard from "../ChannelCard";
import styles from "./ChannelList.module.scss";

const { block } = bem(styles);

export default function ChannelList() {
  const { channelId } = useParams();
  const channels = useAppSelector(selectAvailableChannels);

  return (
    <div className={block()}>
      {channels &&
        channels
          .filter((channel) => channel.messages?.length)
          .sort(sortChannels)
          .map((channel) => (
            <ChannelCard
              key={channel.id}
              {...channel}
              active={channel.id === channelId}
            />
          ))}
    </div>
  );
}
