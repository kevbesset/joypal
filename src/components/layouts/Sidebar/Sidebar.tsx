import MessageCard from "@/components/chat/MessageCard";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Search from "@/components/ui/Search";
import Tabs from "@/components/ui/Tabs";
import { useState } from "react";
import bem from "react-bemthis";
import { useTranslation } from "react-i18next";
import styles from "./Sidebar.module.scss";

const { block, element } = bem(styles);
const tabs = [
  {
    key: "chats",
    count: 25,
    icon: "chat_bubble",
    label: "Chats",
  },
  {
    key: "favorites",
    count: 4,
    icon: "bookmark",
    label: "Favorites",
  },
];

export default function Sidebar() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  return (
    <aside className={block()}>
      <div className={element("header")}>
        <div className={element("title")}>{t("chatbox.sidebar.title")}</div>
        <Button highlight icon>
          <Icon name="add" />
        </Button>
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
      <div className={element("list")}>
        <MessageCard active />
      </div>
    </aside>
  );
}
