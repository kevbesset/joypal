import Button from "@/components/ui/Button";
import CopyButton from "@/components/ui/Button/CopyButton";
import Icon from "@/components/ui/Icon";
import Wysiwyg from "@/components/ui/Wysiwyg";
import { formatDate, formatTime } from "@/libs/helpers/date";
import { ChatMessage, RTCPrompt } from "@/types/Chat.type";
import { useState } from "react";
import bem from "react-bemthis";
import { useTranslation } from "react-i18next";
import MessageData from "../MessageData";
import Prompt from "../Prompt";
import styles from "./Message.module.scss";

const { block, element } = bem(styles);

type Props = {
  message: ChatMessage;
  onRetry: () => void;
  onEdit: (message: ChatMessage) => void;
};

export default function Message({ message, onRetry, onEdit }: Props) {
  const { t } = useTranslation();

  const [isEdit, setIsEdit] = useState(false);
  const [isMarkdown, setIsMarkdown] = useState(true);
  const messageDate = formatDate(new Date(message.created_at));
  const messageTime = formatTime(new Date(message.created_at));

  const isSystemMessage = message.role === "system";
  const isUserMessage = message.role === "user";
  const isAIMessage = message.role === "assistant";

  function renderRole() {
    switch (message.role) {
      case "user":
        return t("chatbox.message.role.user");
      case "error":
      case "system":
        return t("chatbox.message.role.system");
      default:
        return t("chatbox.message.role.assistant");
    }
  }

  function renderIcon() {
    switch (message.role) {
      case "user":
        return (
          <img
            src="https://media.licdn.com/dms/image/C4E03AQGm-rwpONAatw/profile-displayphoto-shrink_400_400/0/1601377777018?e=2147483647&v=beta&t=G9A_yIODEox92NRv0f8VeEGK4XYQGPtEsFV-9e6AzXQ"
            alt=""
            width={32}
            height={32}
          />
        );
      case "system":
      case "error":
        return <Icon name="settings_alert" />;
      default:
        return <Icon name="pet_supplies" />;
    }
  }

  function handleToggleCode() {
    setIsMarkdown(!isMarkdown);
  }

  function handleEdit() {
    setIsEdit(true);
  }

  function handleEditSubmit(prompt: RTCPrompt) {
    onEdit({
      ...message,
      content: prompt.task,
    });
    setIsEdit(false);
  }

  return (
    <div className={block(message.role)}>
      <div className={element("avatar")}>{renderIcon()}</div>
      <div className={element("info")}>
        <div className={element("author")}>{renderRole()}</div>
        <small className={element("date")}>
          {messageDate} • {messageTime}
        </small>
      </div>
      {isEdit ? (
        <Prompt
          onSubmit={handleEditSubmit}
          initialValue={message.content}
          onCancel={() => setIsEdit(false)}
        />
      ) : (
        <div className={element("box")}>
          <div className={element("content")}>
            {isMarkdown ? (
              <Wysiwyg content={message.content} />
            ) : (
              message.content
            )}
          </div>
          {message.done && (
            <div className={element("action")}>
              <MessageData {...message} />
              {!isSystemMessage && (
                <Button
                  className={element("actionButton")}
                  onClick={handleToggleCode}
                >
                  <Icon
                    name={isMarkdown ? "code" : "code_off"}
                    className={element("actionIcon")}
                  />
                </Button>
              )}
              {isUserMessage && (
                <>
                  <Button
                    className={element("actionButton")}
                    onClick={handleEdit}
                  >
                    <Icon name="edit" className={element("actionIcon")} />
                    <span className={element("actionInner")}>
                      {t("chatbox.message.action.edit")}
                    </span>
                  </Button>
                </>
              )}
              {isAIMessage && (
                <Button className={element("actionButton")} onClick={onRetry}>
                  <Icon name="refresh" className={element("actionIcon")} />
                  <span className={element("actionInner")}>
                    {t("chatbox.message.action.redo")}
                  </span>
                </Button>
              )}
              <CopyButton
                copyMessage={message.content}
                className={element("actionButton")}
                iconClassName={element("actionIcon")}
                labelClassName={element("actionInner")}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
