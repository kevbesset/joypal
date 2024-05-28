import ChannelList from "@/components/chat/ChannelList";
import UploadChat from "@/components/chat/UploadChat";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Search from "@/components/ui/Search";
import Tabs from "@/components/ui/Tabs";
import useChannelSearch from "@/libs/hooks/useChannelSearch";
import { useAppDispatch } from "@/store";
import { create } from "@/store/organizerStore";
import { useState } from "react";
import bem from "react-bemthis";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.scss";

const { block, element } = bem(styles);

export default function Sidebar() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { value, setValue, channels } = useChannelSearch();

  const tabs = [
    {
      key: "chats",
      count: channels.length,
      icon: "chat_bubble",
      label: t("chatbox.sidebar.tabs.chats"),
    },
    {
      key: "templates",
      icon: "edit_note",
      label: t("chatbox.sidebar.tabs.templates"),
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  function handleFolderCreation() {
    dispatch(create());
  }

  return (
    <aside className={block()}>
      <div className={element("header")}>
        <div className={element("title")}>{t("chatbox.sidebar.title")}</div>
        <Link to="/">
          <Button icon highlight>
            <Icon name="add" />
          </Button>
        </Link>
        <UploadChat />
      </div>
      <div className={element("tabs")}>
        <Tabs tabs={tabs} active={activeTab} onTabChange={setActiveTab} />
      </div>
      <div className={element("search")}>
        <Search name="sidebar_chat_search" value={value} onChange={setValue} />
        <Button
          icon
          className={element("newFolder")}
          onClick={handleFolderCreation}
        >
          <Icon name="create_new_folder" />
        </Button>
      </div>
      <ChannelList channels={channels} />
    </aside>
  );
}
