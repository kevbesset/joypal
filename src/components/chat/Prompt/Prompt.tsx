import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import useAutosizeTextArea from "@/libs/hooks/useAutosizeTextarea";
import useEvent from "@/libs/hooks/useEvent";
import { useAppSelector } from "@/store";
import { ChatTemplate, RTCPrompt } from "@/types/Chat.type";
import { useEffect, useRef, useState } from "react";
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
  onCreateTemplate: (title: string, prompt: RTCPrompt) => void;
  onUpdateTemplate: (id: string, prompt: RTCPrompt) => void;
  isNew?: boolean;
};

export default function Prompt({
  onSubmit,
  onCreateTemplate,
  onUpdateTemplate,
  isNew,
}: Props) {
  const { t } = useTranslation();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [promptValue, setPromptValue] = useState("");
  const [promptRole, setPromptRole] = useState<string>();
  const { hasEventReceived, read } = useEvent("use:template");

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

  function handleUpdateTemplate(id: string) {
    if (promptRole || promptValue) {
      onUpdateTemplate(id, {
        role: promptRole,
        task: promptValue,
      });
    }
  }

  function handleCreateTemplate(title: string) {
    if (promptRole || promptValue) {
      onCreateTemplate(title, {
        role: promptRole,
        task: promptValue,
      });
    }
  }

  function handleUseTemplate(template: ChatTemplate) {
    const firstRoleMessage = template.messages.find(
      (message) => message.role === "system"
    );
    const firstUserMessage = template.messages.find(
      (message) => message.role === "user"
    );

    if (firstRoleMessage) {
      setPromptRole(firstRoleMessage.content);
    }

    if (firstUserMessage) {
      setPromptValue(firstUserMessage.content);
    }
  }

  useEffect(() => {
    if (hasEventReceived && location.pathname === "/") {
      const args = read();

      if (args?.template) {
        handleUseTemplate(args?.template as ChatTemplate);
      }
    }
  });

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
                onUpdate={handleUpdateTemplate}
                onCreate={handleCreateTemplate}
                onUseTemplate={handleUseTemplate}
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
