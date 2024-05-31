import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import useAutosizeTextArea from "@/libs/hooks/useAutosizeTextarea";
import { useAppSelector } from "@/store";
import { RTCPrompt } from "@/types/Chat.type";
import { useRef, useState } from "react";
import bem from "react-bemthis";
import { useTranslation } from "react-i18next";
import PromptModelPicker from "../PromptModelPicker";
import PromptRole from "../PromptRole";
import PromptTemplate from "../PromptTemplate";
import Textarea from "../Textarea";
import styles from "./Prompt.module.scss";

const { block, element } = bem(styles);

type Props = {
  onSubmit: (prompt: RTCPrompt) => void;
  onSaveTemplate: (prompt: RTCPrompt) => void;
  isNew?: boolean;
};

export default function Prompt({ onSubmit, onSaveTemplate, isNew }: Props) {
  const { t } = useTranslation();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [promptValue, setPromptValue] = useState("");
  const [promptRole, setPromptRole] = useState<string>();

  const isEmpty = !promptRole && !promptValue;

  const templateFound = useAppSelector((state) =>
    state.chat.templates.find((template) => {
      let valid = true;

      const firstRoleMessage = template.messages.find(
        (message) => message.role === "system"
      );
      const firstUserMessage = template.messages.find(
        (message) => message.role === "user"
      );

      if (
        promptRole &&
        (!firstRoleMessage || firstRoleMessage.content !== promptRole)
      ) {
        valid = false;
      }
      if (
        promptValue &&
        (!firstUserMessage || firstUserMessage.content !== promptValue)
      ) {
        valid = false;
      }
      if (isEmpty) valid = false;

      return valid;
    })
  );
  const isTemplate = !!templateFound;

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

  function handleSaveTemplate() {
    if (promptRole || promptValue) {
      onSaveTemplate({
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
            <>
              <PromptRole
                onSubmit={setPromptRole}
                completed={!!promptRole}
                className={element("button")}
              />
              <PromptTemplate
                onSubmit={handleSaveTemplate}
                isEmpty={isEmpty}
                isTemplate={isTemplate}
                className={element("button")}
              />
            </>
          )}
        </div>
        <div className={element("cell")}>
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
