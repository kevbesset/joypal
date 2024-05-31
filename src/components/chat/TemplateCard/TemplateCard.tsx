import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { formatTime } from "@/libs/helpers/date";
import { useClickOutside } from "@/libs/hooks/useClickOutside";
import { useAppDispatch } from "@/store";
import { removeTemplate, renameTemplate } from "@/store/chatStore";
import { ChatChannel } from "@/types/Chat.type";
import {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  useState,
} from "react";
import bem from "react-bemthis";
import styles from "./TemplateCard.module.scss";

const { block, element } = bem(styles);

type Props = {
  active?: boolean;
  template: ChatChannel;
};

export default function TemplateCard({ active, template, ...props }: Props) {
  const [isRenaming, setIsRenaming] = useState(false);
  const itemRef = useClickOutside(handleClickOutside);
  const title = template.title;
  const lastMessage = template.messages[template.messages.length - 1];
  const time = formatTime(new Date(lastMessage.created_at));
  const dispatch = useAppDispatch();

  function handleRemoveTemplate(event: ReactMouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    dispatch(removeTemplate(template.id));
  }

  function handleEditTemplate(event: ReactMouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsRenaming(true);
  }

  function handleDoubleClick() {
    setIsRenaming(true);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(
      renameTemplate({ templateId: template.id, name: event.target.value })
    );
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
        renameTemplate({
          templateId: template.id,
          name: template.messages[0].content,
        })
      );
    }
  }

  return (
    <div
      ref={itemRef}
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
        <Button icon onClick={handleEditTemplate} className={element("button")}>
          <Icon name="edit" />
        </Button>
        <Button
          icon
          className={element("button", "delete")}
          onClick={handleRemoveTemplate}
        >
          <Icon name="delete" />
        </Button>
      </div>
    </div>
  );
}
