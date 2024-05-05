import Separator from "@/components/ui/Separator";
import { useEffect, useRef } from "react";
import bem from "react-bemthis";
import { useTranslation } from "react-i18next";
import Message from "../Message/Message";
import Prompt from "../Prompt";
import styles from "./Chatbox.module.scss";

const { block, element } = bem(styles);

export default function Chatbox() {
  const { t } = useTranslation();
  const scrollableView = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollableView.current?.scrollIntoView({
      //   behavior: "smooth",
      block: "end",
    });
  });

  return (
    <div className={block()}>
      <div className={element("body")}>
        <div ref={scrollableView} className={element("list")}>
          <Message role="user" />
          <Message role="assistant" />
          <Message role="user" />
          <Message role="assistant" />
          <Message role="user" />
          <Message role="assistant" />
          <Separator>{t("chatbox.separator")}</Separator>
          <Message role="user" />
          <Message role="assistant" />
        </div>
      </div>
      <footer className={element("footer")}>
        <Prompt />
      </footer>
    </div>
  );
}
