import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import useAutosizeTextArea from "@/libs/hooks/useAutosizeTextarea";
import { RTCPrompt } from "@/types/Chat.type";
import { useRef, useState } from "react";
import bem from "react-bemthis";
import { useTranslation } from "react-i18next";
import PromptModelPicker from "../PromptModelPicker";
import PromptRole from "../PromptRole";
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
      <Textarea
        name="prompt"
        value={promptValue}
        onChange={setPromptValue}
        onSubmit={sendSubmitEvent}
        placeholder={t("chatbox.prompt.placeholder")}
        className={element("input")}
      />
      <div className={element("footer")}>
        <div className={element("cell")}>
          <PromptModelPicker className={element("button")} />
          {isNew && (
            <PromptRole onSubmit={setPromptRole} completed={!!promptRole} />
          )}
        </div>
        <div className={element("cell")}>
          {isNew && (!!promptValue || !!promptRole) && (
            <Button
              icon
              rounded
              className={element("submit")}
              onSubmit={sendSubmitEvent}
            >
              <Icon name="bookmark" />
            </Button>
          )}
          <Button
            icon
            rounded
            disabled={!promptValue}
            className={element("submit")}
            onSubmit={sendSubmitEvent}
          >
            <Icon name="north" />
          </Button>
        </div>
      </div>
    </div>
  );
}
