import Separator from "@/components/ui/Separator";
import { dateIsToday } from "@/libs/helpers/date";
import useChat from "@/libs/hooks/useChat";
import { Fragment, useEffect, useRef } from "react";
import bem from "react-bemthis";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Message from "../Message";
import Prompt from "../Prompt";
import styles from "./Chatbox.module.scss";

const { block, element } = bem(styles);

type Props = {
  channelId?: string;
  model: string;
};

export default function Chatbox({ channelId: routeChannelId, model }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const routeParams = useParams();

  const scrollableView = useRef<HTMLDivElement>(null);
  const { channelId, messages, sendMessage } = useChat(routeChannelId);

  function scrollToBottom() {
    scrollableView.current?.scrollIntoView({
      block: "end",
    });
  }

  async function handlePromptSubmit(content: string) {
    await sendMessage({
      role: "user",
      content,
      model,
      created_at: Date.now(),
      done: true,
    });
    if (!routeParams.channelId) {
      return navigate(`/c/${channelId}`);
    }
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
                !dateIsToday(new Date(messages[messageIndex - 1].created_at));

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
