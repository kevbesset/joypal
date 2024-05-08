import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { formatDate, formatTime } from "@/libs/helpers/date";
import { ChatMessage } from "@/types/Chat.type";
import bem from "react-bemthis";
import { useTranslation } from "react-i18next";
import styles from "./Message.module.scss";

const { block, element } = bem(styles);

type Props = ChatMessage;

export default function Message(message: Props) {
  const { t } = useTranslation();

  const messageDate = formatDate(new Date(message.created_at));

  const messageTime = formatTime(new Date(message.created_at));

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
        <div className={element("content")}>{message.content}</div>
        {message.role === "assistant" && message.done && (
          <div className={element("action")}>
            <div className={element("actionInfo")}>
              <div className={element("actionLabel")}>
                <Icon name="language" />
              </div>
              <div className={element("actionValue")}>{message.model}</div>
            </div>
            <div className={element("actionInfo")}>
              <div className={element("actionLabel")}>
                <Icon name="hourglass_top" />
              </div>
              <div className={element("actionValue")}>{message.duration}ms</div>
            </div>
            <Button className={element("actionButton")}>
              <Icon name="refresh" className={element("actionIcon")} />
              <span className={element("actionInner")}>
                {t("chatbox.message.action.redo")}
              </span>
            </Button>
            <Button className={element("actionButton")}>
              <Icon name="content_copy" className={element("actionIcon")} />
              <span className={element("actionInner")}>
                {t("chatbox.message.action.copy")}
              </span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
