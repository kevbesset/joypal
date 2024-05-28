import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import useAutosizeTextArea from "@/libs/hooks/useAutosizeTextarea";
import { RTCPrompt } from "@/types/Chat.type";
import { useRef, useState } from "react";
import bem from "react-bemthis";
import { useTranslation } from "react-i18next";
import PromptEnhancer from "../PromptEnhancer";
import PromptRole from "../PromptEnhancer/PromptRole";
import Textarea from "../Textarea";
import styles from "./Prompt.module.scss";

const { block, element } = bem(styles);

type Props = {
  onSubmit: (prompt: RTCPrompt) => void;
  isNew?: boolean;
};

export default function Prompt({ onSubmit, isNew }: Props) {
  const { t } = useTranslation();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [promptValue, setPromptValue] = useState("");
  const [promptRole, setPromptRole] = useState<string>();

  useAutosizeTextArea(textAreaRef.current, promptValue);

  function clearPrompt() {
    setPromptValue("");
  }

  function sendSubmitEvent() {
    clearPrompt();

    if (promptValue) {
      onSubmit({
        role: promptRole,
        task: promptValue,
      });
    }
  }

  return (
    <div className={block()}>
      {isNew && (
        <>
          <div className={element("title")}>{t("chatbox.prompt.title")}</div>
          {isNew && (
            <div className={element("action")}>
              <PromptRole onSubmit={setPromptRole} />
              <Button className={element("actionButton")}>
                <Icon name="edit_note" className={element("actionIcon")} />
                <span className={element("actionLabel")}>
                  {t("chatbox.prompt.actions.template")}
                </span>
              </Button>
            </div>
          )}
        </>
      )}
      <div className={element("field")}>
        <PromptEnhancer className={element("magicButton")} />
        <Textarea
          name="prompt"
          value={promptValue}
          onChange={setPromptValue}
          onSubmit={sendSubmitEvent}
          placeholder={t("chatbox.prompt.placeholder")}
          className={element("input")}
        />
      </div>
    </div>
  );
}
