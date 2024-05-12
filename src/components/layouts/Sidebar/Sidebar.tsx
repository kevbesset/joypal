import ChannelList from "@/components/chat/ChannelList";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Search from "@/components/ui/Search";
import Tabs from "@/components/ui/Tabs";
import { useAppSelector } from "@/store";
import { selectAvailableChannels } from "@/store/chatSlice";
import { useState } from "react";
import bem from "react-bemthis";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.scss";

const { block, element } = bem(styles);

export default function Sidebar() {
  const channels = useAppSelector(selectAvailableChannels);
  const { t } = useTranslation();

  const tabs = [
    {
      key: "chats",
      count: channels.length,
      icon: "chat_bubble",
      label: t("chatbox.sidebar.tabs.chats"),
    },
    {
      key: "pals",
      icon: "diversity_1",
      label: t("chatbox.sidebar.tabs.pals"),
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  return (
    <aside className={block()}>
      <div className={element("header")}>
        <div className={element("title")}>{t("chatbox.sidebar.title")}</div>
        <Link to="/">
          <Button icon highlight>
            <Icon name="add" />
          </Button>
        </Link>
        <Button icon>
          <Icon name="more_horiz" />
        </Button>
      </div>
      <div className={element("tabs")}>
        <Tabs tabs={tabs} active={activeTab} onTabChange={setActiveTab} />
      </div>
      <div className={element("search")}>
        <Search name="sidebar_chat_search" />
      </div>
      <ChannelList />
    </aside>
  );
}
