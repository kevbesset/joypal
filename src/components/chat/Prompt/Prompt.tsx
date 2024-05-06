import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import bem from "react-bemthis";
import { useTranslation } from "react-i18next";
import styles from "./Prompt.module.scss";

const { block, element } = bem(styles);

export default function Prompt() {
  const { t } = useTranslation();

  return (
    <div className={block()}>
      <div className={element("inner")}>
        <input
          type="text"
          name="prompt"
          id="prompt"
          autoFocus
          autoComplete="off"
          placeholder={t("chatbox.prompt.placeholder")}
          className={element("input")}
        />
        <Button icon className={element("send")}>
          <Icon name="send" />
        </Button>
      </div>
      <Button className={element("button")}>
        <Icon name="mic" />
      </Button>
    </div>
  );
}
