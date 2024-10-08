import Separator from "@/components/ui/Separator";
import { dateIsToday } from "@/libs/helpers/date";
import useChat from "@/libs/hooks/useChat";
import { RTCPrompt } from "@/types/Chat.type";
import { Fragment, useEffect, useRef } from "react";
import bem from "react-bemthis";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import Message from "../Message";
import Prompt from "../Prompt";
import styles from "./Chatbox.module.scss";

const { block, element } = bem(styles);

type Props = {
  channelId: string;
  model: string;
};

export default function Chatbox({ channelId, model }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollableView = useRef<HTMLDivElement>(null);
  const { channel, sendMessage, createTemplate, updateTemplate, retry, edit } =
    useChat(channelId);

  function scrollToBottom() {
    scrollableView.current?.scrollIntoView({
      block: "end",
    });
  }

  async function handlePromptSubmit(content: RTCPrompt) {
    await sendMessage(content, model);
  }

  async function handleCreateTemplate(title: string, content: RTCPrompt) {
    await createTemplate(title, content, model);
  }

  async function handleUpdateTemplate(id: string, content: RTCPrompt) {
    await updateTemplate(id, content, model);
  }

  useEffect(() => {
    if (
      channelId &&
      channel.messages.length === 0 &&
      location.pathname !== "/"
    ) {
      navigate("/");
    }
  });

  useEffect(() => {
    scrollToBottom();
  }, [channel.messages]);

  return (
    <div className={block({ new: !channel.messages?.length })}>
      <div className={element("body")}>
        <div ref={scrollableView} className={element("list")}>
          {channel.messages &&
            channel.messages.map((message, messageIndex) => {
              const isFirstMessageToday =
                messageIndex > 0 &&
                !dateIsToday(
                  new Date(channel.messages[messageIndex - 1].created_at)
                ) &&
                dateIsToday(new Date(message.created_at));
              return (
                <Fragment key={messageIndex}>
                  {isFirstMessageToday && (
                    <Separator>{t("chatbox.separator")}</Separator>
                  )}
                  <Message
                    message={message}
                    onRetry={() => retry(message)}
                    onEdit={edit}
                  />
                </Fragment>
              );
            })}
        </div>
      </div>
      <footer className={element("footer")}>
        {!channel.messages.length && (
          <div className={element("title")}>{t("chatbox.prompt.title")}</div>
        )}
        <Prompt
          onSubmit={handlePromptSubmit}
          onCreateTemplate={handleCreateTemplate}
          onUpdateTemplate={handleUpdateTemplate}
          isNew={!channel.messages?.length}
        />
      </footer>
    </div>
  );
}
