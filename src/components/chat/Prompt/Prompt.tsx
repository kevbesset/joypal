import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import bem from "react-bemthis";
import { useTranslation } from "react-i18next";
import styles from "./Prompt.module.scss";

const { block, element } = bem(styles);

type Props = {
  onSubmit: (prompt: string) => void;
};

export default function Prompt({ onSubmit }: Props) {
  const { t } = useTranslation();
  const [promptValue, setPromptValue] = useState("");

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setPromptValue(event.target.value);
  }

  function clearPrompt() {
    setPromptValue("");
  }

  function handleSubmit(event: KeyboardEvent<HTMLInputElement>) {
    if (!event.shiftKey && event.code === "Enter") {
      clearPrompt();

      if (promptValue) {
        onSubmit(promptValue);
      }
    }
  }

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
          value={promptValue}
          onKeyDown={handleSubmit}
          onChange={handleInputChange}
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
