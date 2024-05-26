import Chatbox from "@/components/chat/Chatbox";
import Sidebar from "@/components/layouts/Sidebar";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import useChat from "@/libs/hooks/useChat";
import useModel from "@/libs/hooks/useModel";
import { useEffect } from "react";
import bem from "react-bemthis";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import styles from "./Dashboard.module.scss";

const { block, element } = bem(styles);

export default function Dashboard() {
  const { t } = useTranslation();
  const params = useParams();
  const channelId = params.channelId || "new";
  const { channel, download } = useChat(channelId);
  const { model, setModel } = useModel();

  function handleDownloadChannel() {
    download();
  }

  useEffect(() => {
    if (
      channel &&
      channel.messages.length &&
      model !== channel.messages[channel.messages.length - 1].model
    ) {
      setModel(channel.messages[channel.messages.length - 1].model);
    }
  }, [channelId, channel]);

  return (
    <>
      <Sidebar />
      <div className={block()}>
        <div className={element("header")}>
          <div className={element("title")}>
            {channel.title || t("chatbox.sidebar.newChat")}
          </div>
          <div className={element("action")}>
            {channel && !!channel.messages.length && (
              <Button icon onClick={handleDownloadChannel}>
                <Icon name="upload" />
              </Button>
            )}
          </div>
        </div>
        <main data-theme="inner" className={element("body")}>
          <Chatbox key={channelId} model={model} channelId={channelId} />
        </main>
      </div>
    </>
  );
}
