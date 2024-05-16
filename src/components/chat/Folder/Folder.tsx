import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { useClickOutside } from "@/libs/hooks/useClickOutside";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  remove,
  rename,
  selectChannelsFromFolder,
  selectSubfolders,
} from "@/store/organizerStore";
import { ChatFolder } from "@/types/Chat.type";
import {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  useState,
} from "react";
import bem from "react-bemthis";
import { useParams } from "react-router-dom";
import ChannelCard from "../ChannelCard";
import styles from "./Folder.module.scss";

const { block, element } = bem(styles);

export default function Folder(folder: ChatFolder) {
  const [isRenaming, setIsRenaming] = useState(false);
  const subfolders = useAppSelector(selectSubfolders(folder.id));
  const channels = useAppSelector(selectChannelsFromFolder(folder.id));
  const itemRef = useClickOutside(handleClickOutside);
  const { channelId } = useParams();
  const dispatch = useAppDispatch();

  async function handleDoubleClick() {
    await setIsRenaming(true);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(rename({ folderId: folder.id, name: event.target.value }));
  }

  function handleSubmit(event: KeyboardEvent<HTMLInputElement>) {
    if (["Enter", "NumpadEnter", "Escape"].includes(event.code)) {
      closeRenaming();
    }
  }

  function handleFocus(event: FocusEvent<HTMLInputElement>) {
    event.target.select();
  }

  function handleClickOutside() {
    closeRenaming();
  }

  function handleEdit(event: ReactMouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsRenaming(true);
  }

  function handleRemove(event: ReactMouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    dispatch(remove(folder.id));
  }

  function closeRenaming() {
    setIsRenaming(false);

    if (folder.name === "") {
      dispatch(rename({ folderId: folder.id, name: "Untitled" }));
    }
  }

  return (
    <div className={block({ isRenaming })}>
      <div
        ref={itemRef}
        className={element("folder")}
        onDoubleClick={handleDoubleClick}
      >
        <div className={element("icon")}>
          <Icon name="folder" />
        </div>
        {isRenaming ? (
          <input
            type="text"
            name="rename_channel"
            id="rename_channel"
            className={element("input")}
            value={folder.name}
            onChange={handleInputChange}
            onKeyDown={handleSubmit}
            onFocus={handleFocus}
            autoFocus
          />
        ) : (
          <div className={element("name")}>{folder.name}</div>
        )}
        <div className={element("action")}>
          <Button icon onClick={handleEdit} className={element("button")}>
            <Icon name="edit" />
          </Button>
          <Button
            icon
            className={element("button", "delete")}
            onClick={handleRemove}
          >
            <Icon name="delete" />
          </Button>
        </div>
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
