import Icon from "@/components/ui/Icon";
import { formatTime } from "@/libs/helpers/date";
import { ChatChannel } from "@/types/Chat.type";
import bem from "react-bemthis";
import { Link } from "react-router-dom";
import styles from "./ChannelCard.module.scss";

const { block, element } = bem(styles);

type Props = ChatChannel & {
  active?: boolean;
};

export default function ChannelCard({ active, ...channel }: Props) {
  const title = channel.title || channel.messages[0].content;
  const lastMessage = channel.messages[channel.messages.length - 1];
  const time = formatTime(new Date(lastMessage.created_at));
  const shortenDescription = lastMessage.content.slice(0, 80);
  const description =
    shortenDescription.length < lastMessage.content.length
      ? `${shortenDescription}...`
      : shortenDescription;

  return (
    <Link to={`/c/${channel.id}`} className={block({ active })}>
      <div className={element("icon")}>
        <Icon name="pet_supplies" />
      </div>
      <div className={element("info")}>
        <div className={element("header")}>
          <div className={element("title")}>{title}</div>
          <div className={element("date")}>{time}</div>
        </div>
        <div className={element("content")}>{description}</div>
      </div>
    </Link>
  );
}
