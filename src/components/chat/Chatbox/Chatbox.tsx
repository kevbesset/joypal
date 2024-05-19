import Separator from "@/components/ui/Separator";
import { dateIsToday } from "@/libs/helpers/date";
import useChat from "@/libs/hooks/useChat";
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
  const { channel, sendMessage, retry } = useChat(channelId);

  function scrollToBottom() {
    scrollableView.current?.scrollIntoView({
      block: "end",
    });
  }

  async function handlePromptSubmit(content: string) {
    await sendMessage(content, model);
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
    <div className={block()}>
      <div className={element("body")}>
        <div ref={scrollableView} className={element("list")}>
          {channel.messages &&
            channel.messages.map((message, messageIndex) => {
              const isFirstMessageToday =
                messageIndex > 0 &&
                !dateIsToday(
                  new Date(channel.messages[messageIndex - 1].created_at)
                );

              return (
                <Fragment key={messageIndex}>
                  {isFirstMessageToday && (
                    <Separator>{t("chatbox.separator")}</Separator>
                  )}
                  <Message message={message} onRetry={() => retry(message)} />
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
