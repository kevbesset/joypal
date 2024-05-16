import Icon from "@/components/ui/Icon";
import { sortChannels } from "@/libs/helpers/sort";
import { useAppSelector } from "@/store";
import {
  selectChannelsWithoutFolder,
  selectSubfolders,
} from "@/store/organizerStore";
import bem from "react-bemthis";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import ChannelCard from "../ChannelCard";
import Folder from "../Folder";
import styles from "./ChannelList.module.scss";

const { block, element } = bem(styles);

export default function ChannelList() {
  const { t } = useTranslation();
  const { channelId } = useParams();
  const channels = useAppSelector(selectChannelsWithoutFolder);
  const folders = useAppSelector(selectSubfolders());

  return (
    <div className={block()}>
      {folders &&
        folders.map((folder) => <Folder key={folder.id} {...folder} />)}
      {!!folders.length && <hr className={element("separator")} />}
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
              {...channel}
              active={channel.id === channelId}
            />
          ))}
    </div>
  );
}
