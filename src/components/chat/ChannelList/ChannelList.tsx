import Icon from "@/components/ui/Icon";
import { sortChannels } from "@/libs/helpers/sort";
import { ChatChannel } from "@/types/Chat.type";
import bem from "react-bemthis";
import "react-complex-tree/lib/style-modern.css";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import ChannelCard from "../ChannelCard";
import styles from "./ChannelList.module.scss";

const { block, element } = bem(styles);

type Props = {
  channels?: ChatChannel[];
};

export default function ChannelList({ channels }: Props) {
  const { t } = useTranslation();
  const { channelId } = useParams();

  return (
    <div className={block()}>
      <Link to="/" className={element("newChat")}>
        <Icon name="add" />
        <span className={element("newChatText")}>
          {t("chatbox.sidebar.newChat")}
        </span>
      </Link>
      {channels &&
        channels
          .filter((channel) => channel.messages?.length)
          .sort(sortChannels)
          .map((channel) => (
            <ChannelCard
              key={channel.id}
              channel={channel}
              active={channel.id === channelId}
            />
          ))}
    </div>
  );
}
