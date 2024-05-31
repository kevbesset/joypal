import ChannelList from "@/components/chat/ChannelList";
import TemplateList from "@/components/chat/TemplateList";
import UploadChat from "@/components/chat/UploadChat";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Search from "@/components/ui/Search";
import Tabs from "@/components/ui/Tabs";
import useChannelSearch from "@/libs/hooks/useChannelSearch";
import { useAppSelector } from "@/store";
import { useState } from "react";
import bem from "react-bemthis";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.scss";

const { block, element } = bem(styles);

export default function Sidebar() {
  const { t } = useTranslation();
  const { value, setValue, channels } = useChannelSearch();
  const templates = useAppSelector((state) => state.chat.templates);

  const tabs = [
    {
      key: "chats",
      count: channels.length,
      icon: "chat_bubble",
      label: t("chatbox.sidebar.tabs.chats"),
    },
    {
      key: "templates",
      icon: "bookmark",
      label: t("chatbox.sidebar.tabs.templates"),
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  return (
    <aside className={block()}>
      <div className={element("header")}>
        <div className={element("title")}>{t("chatbox.sidebar.title")}</div>
        <Link to="/">
          <Button highlight icon>
            <Icon name="edit_square" />
          </Button>
        </Link>
      </div>
      <div className={element("tabs")}>
        <Tabs tabs={tabs} active={activeTab} onTabChange={setActiveTab} />
      </div>
      {activeTab === "chats" ? (
        <>
          <div className={element("search")}>
            <Search
              name="sidebarChatSearch"
              value={value}
              onChange={setValue}
            />
            <UploadChat />
          </div>
          <ChannelList channels={channels} />
        </>
      ) : (
        <>
          <div className={element("search")}>
            <Search
              name="sidebarTemplateSearch"
              value={value}
              onChange={setValue}
            />
          </div>
          <TemplateList templates={templates} />
        </>
      )}
    </aside>
  );
}
