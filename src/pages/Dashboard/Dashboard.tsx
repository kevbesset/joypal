import Chatbox from "@/components/chat/Chatbox";
import Sidebar from "@/components/layouts/Sidebar";
import ModelSelect from "@/components/models/ModelSelect";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import useChat from "@/libs/hooks/useChat";
import { useEffect, useState } from "react";
import bem from "react-bemthis";
import { Outlet, useParams } from "react-router-dom";
import styles from "./Dashboard.module.scss";

const { block, element } = bem(styles);
const DEFAULT_MODEL = "llama3:latest";

export default function Dashboard() {
  const params = useParams();
  const channelId = params.channelId || "new";
  const [model, setModel] = useState<string>(DEFAULT_MODEL);
  const { channel } = useChat(channelId);

  function handleModelChange(newModel: string) {
    setModel(newModel);
  }

  useEffect(() => {
    if (
      channel &&
      channel.messages.length &&
      model !== channel.messages[channel.messages.length - 1].model
    ) {
      setModel(channel.messages[channel.messages.length - 1].model);
    }
  }, [channelId, channel, model]);

  return (
    <>
      <Sidebar />
      <div className={block()}>
        <div className={element("header")}>
          <div className={element("title")}>
            <ModelSelect value={model} onModelSelect={handleModelChange} />
          </div>
          <Button icon>
            <Icon name="upload" />
          </Button>
        </div>
        <main data-theme="inner" className={element("body")}>
          <Outlet />
          <Chatbox
            key={channelId}
            model={model || DEFAULT_MODEL}
            channelId={channelId}
          />
        </main>
      </div>
    </>
  );
}
