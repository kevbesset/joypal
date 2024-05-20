import useAutosizeTextArea from "@/libs/hooks/useAutosizeTextarea";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import bem from "react-bemthis";
import { useTranslation } from "react-i18next";
import styles from "./Prompt.module.scss";

const { block, element } = bem(styles);

type Props = {
  onSubmit: (prompt: string) => void;
};

export default function Prompt({ onSubmit }: Props) {
  const { t } = useTranslation();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [promptValue, setPromptValue] = useState("");

  useAutosizeTextArea(textAreaRef.current, promptValue);

  function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setPromptValue(event.target.value);
  }

  function clearPrompt() {
    setPromptValue("");
  }

  function sendSubmitEvent() {
    clearPrompt();

    if (promptValue) {
      onSubmit(promptValue);
    }
  }

  function handleSubmit(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (!event.shiftKey && ["Enter", "NumpadEnter"].includes(event.code)) {
      sendSubmitEvent();
    }
  }

  return (
    <div className={block()}>
      <div className={element("inner")}>
        <textarea
          ref={textAreaRef}
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
      </div>
    </div>
  );
}
