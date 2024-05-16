import Icon from "@/components/ui/Icon";
import { useAppSelector } from "@/store";
import {
  selectChannelsFromFolder,
  selectSubfolders,
} from "@/store/organizerStore";
import { ChatFolder } from "@/types/Chat.type";
import bem from "react-bemthis";
import { useParams } from "react-router-dom";
import ChannelCard from "../ChannelCard";
import styles from "./Folder.module.scss";

const { block, element } = bem(styles);

export default function Folder(folder: ChatFolder) {
  const subfolders = useAppSelector(selectSubfolders(folder.id));
  const channels = useAppSelector(selectChannelsFromFolder(folder.id));
  const { channelId } = useParams();

  return (
    <div className={block()}>
      <div className={element("folder")}>
        <div className={element("icon")}>
          <Icon name="folder" />
        </div>
        <div className={element("name")}>{folder.name}</div>
      </div>
      <div className={element("inner")}>
        {subfolders &&
          subfolders.map((subfolder) => (
            <Folder key={subfolder.id} {...subfolder} />
          ))}
        {channels &&
          channels.map((channel) => (
            <ChannelCard
              key={channel.id}
              {...channel}
              active={channel.id === channelId}
            />
          ))}
      </div>
    </div>
  );
}
