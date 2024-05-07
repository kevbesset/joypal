import Separator from "@/components/ui/Separator";
import { dateIsToday } from "@/libs/helpers/date";
import useChat from "@/libs/hooks/useChat";
import { Fragment, useEffect, useRef } from "react";
import bem from "react-bemthis";
import { useTranslation } from "react-i18next";
import Message from "../Message/Message";
import Prompt from "../Prompt";
import styles from "./Chatbox.module.scss";

const { block, element } = bem(styles);
const DEFAULT_MODEL = "llama3:latest";

export default function Chatbox() {
  const { t } = useTranslation();
  const scrollableView = useRef<HTMLDivElement>(null);
  const { messages, sendMessage } = useChat();

  function scrollToBottom() {
    scrollableView.current?.scrollIntoView({
      block: "end",
    });
  }

  async function handlePromptSubmit(content: string) {
    await sendMessage({
      role: "user",
      content,
      model: DEFAULT_MODEL,
      created_at: new Date(),
      done: true,
    });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={block()}>
      <div className={element("body")}>
        <div ref={scrollableView} className={element("list")}>
          {messages &&
            messages.map((message, messageIndex) => {
              const isFirstMessageToday =
                messageIndex > 0 &&
                !dateIsToday(messages[messageIndex - 1].created_at);

              return (
                <Fragment key={messageIndex}>
                  {isFirstMessageToday && (
                    <Separator>{t("chatbox.separator")}</Separator>
                  )}
                  <Message {...message} />
                </Fragment>
              );
            })}
        </div>
      </div>
      <footer className={element("footer")}>
        <Prompt onSubmit={handlePromptSubmit} />
      </footer>
    </div>
  );
}
