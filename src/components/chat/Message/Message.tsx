import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import bem from "react-bemthis";
import { useTranslation } from "react-i18next";
import styles from "./Message.module.scss";

const { block, element } = bem(styles);

type Props = {
  role: "user" | "assistant";
};

export default function Message({ role }: Props) {
  const { t } = useTranslation();

  return (
    <div className={block(role)}>
      <div className={element("avatar")}>
        {role === "user" ? (
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
          {role === "user" ? "You" : "Assistant"}
        </div>
        <small className={element("date")}>24 Sep • 11:30 PM</small>
      </div>
      <div className={element("box")}>
        <div className={element("content")}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor vel quo
          laborum cumque! Animi nostrum ab similique earum nesciunt, accusamus,
          laudantium blanditiis temporibus ad laboriosam voluptas cum voluptatem
          atque sapiente.
        </div>
        {role === "assistant" && (
          <div className={element("action")}>
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
