import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { formatTime } from "@/libs/helpers/date";
import { useClickOutside } from "@/libs/hooks/useClickOutside";
import { useAppDispatch } from "@/store";
import { remove, rename } from "@/store/chatStore";
import { ChatChannel } from "@/types/Chat.type";
import {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  useState,
} from "react";
import bem from "react-bemthis";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./ChannelCard.module.scss";

const { block, element } = bem(styles);

type Props = {
  active?: boolean;
  channel: ChatChannel;
};

export default function ChannelCard({ active, channel, ...props }: Props) {
  const [isRenaming, setIsRenaming] = useState(false);
  const itemRef = useClickOutside(handleClickOutside);
  const routeParams = useParams();
  const navigate = useNavigate();
  const title = channel.title;
  const lastMessage = channel.messages[channel.messages.length - 1];
  const time = formatTime(new Date(lastMessage.created_at));
  const dispatch = useAppDispatch();

  function handleRemoveChannel(event: ReactMouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    dispatch(remove(channel.id));
    if (routeParams?.channelId === channel.id) {
      navigate("/");
    }
  }

  function handleEditChannel(event: ReactMouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsRenaming(true);
  }

  function handleDoubleClick() {
    setIsRenaming(true);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(rename({ channelId: channel.id, name: event.target.value }));
  }

  function handleFocus(event: FocusEvent<HTMLInputElement>) {
    event.target.select();
  }

  function handleSubmit(event: KeyboardEvent<HTMLInputElement>) {
    if (["Enter", "NumpadEnter", "Escape"].includes(event.code)) {
      closeRenaming();
    }
  }

  function handleClickOutside() {
    closeRenaming();
  }

  function closeRenaming() {
    setIsRenaming(false);

    if (title === "") {
      dispatch(
        rename({ channelId: channel.id, name: channel.messages[0].content })
      );
    }
  }

  return (
    <Link
      ref={itemRef}
      to={`/c/${channel.id}`}
      className={block({ active, isRenaming })}
      onDoubleClick={handleDoubleClick}
      {...props}
    >
      {isRenaming ? (
        <input
          type="text"
          name="rename_channel"
          id="rename_channel"
          className={element("input")}
          value={title}
          onChange={handleInputChange}
          onKeyDown={handleSubmit}
          onFocus={handleFocus}
          autoFocus
        />
      ) : (
        <>
          <div className={element("info")}>
            <div className={element("header")}>
              <div className={element("title")}>{title}</div>
              <div className={element("date")}>{time}</div>
            </div>
            <div className={element("content")}>{lastMessage.content}</div>
          </div>
        </>
      )}
      <div className={element("action")}>
        <Button icon onClick={handleEditChannel} className={element("button")}>
          <Icon name="edit" />
        </Button>
        <Button
          icon
          className={element("button", "delete")}
          onClick={handleRemoveChannel}
        >
          <Icon name="delete" />
        </Button>
      </div>
    </Link>
  );
}
