import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Wysiwyg from "@/components/ui/Wysiwyg";
import { clipboardCopy } from "@/libs/helpers/clipboard";
import { formatDate, formatTime } from "@/libs/helpers/date";
import { ChatMessage } from "@/types/Chat.type";
import { useState } from "react";
import bem from "react-bemthis";
import { useTranslation } from "react-i18next";
import MessageData from "../MessageData";
import styles from "./Message.module.scss";

const { block, element } = bem(styles);

type Props = {
  message: ChatMessage;
  onRetry: () => void;
};

export default function Message({ message, onRetry }: Props) {
  const { t } = useTranslation();

  const [isCopied, setIsCopied] = useState(false);
  const [isMarkdown, setIsMarkdown] = useState(true);
  const messageDate = formatDate(new Date(message.created_at));
  const messageTime = formatTime(new Date(message.created_at));

  function handleCopy() {
    setIsCopied(true);
    clipboardCopy(message.content);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }

  function handleToggleCode() {
    setIsMarkdown(!isMarkdown);
  }

  return (
    <div className={block(message.role)}>
      <div className={element("avatar")}>
        {message.role === "user" ? (
          <img
            src="https://media.licdn.com/dms/image/C4E03AQGm-rwpONAatw/profile-displayphoto-shrink_400_400/0/1601377777018?e=2147483647&v=beta&t=G9A_yIODEox92NRv0f8VeEGK4XYQGPtEsFV-9e6AzXQ"
            alt=""
            width={32}
            height={32}
          />
        ) : (
          <Icon name="pet_supplies" />
        )}
      </div>
      <div className={element("info")}>
        <div className={element("author")}>
          {message.role === "user" ? "You" : "Assistant"}
        </div>
        <small className={element("date")}>
          {messageDate} • {messageTime}
        </small>
      </div>
      <div className={element("box")}>
        <div className={element("content")}>
          {isMarkdown ? <Wysiwyg content={message.content} /> : message.content}
        </div>
        {message.role === "assistant" && message.done && (
          <div className={element("action")}>
            <MessageData {...message} />
            <Button
              className={element("actionButton")}
              onClick={handleToggleCode}
            >
              <Icon
                name={isMarkdown ? "code" : "code_off"}
                className={element("actionIcon")}
              />
            </Button>
            <Button className={element("actionButton")} onClick={onRetry}>
              <Icon name="refresh" className={element("actionIcon")} />
              <span className={element("actionInner")}>
                {t("chatbox.message.action.redo")}
              </span>
            </Button>
            <Button
              className={element("actionButton")}
              disabled={isCopied}
              onClick={handleCopy}
            >
              <Icon
                name={isCopied ? "check" : "content_copy"}
                className={element("actionIcon")}
              />
              <span className={element("actionInner")}>
                {t(
                  `chatbox.message.action.${isCopied ? "copy_success" : "copy"}`
                )}
              </span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
