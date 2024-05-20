import Chatbox from "@/components/chat/Chatbox";
import Sidebar from "@/components/layouts/Sidebar";
import ModelSelect from "@/components/models/ModelSelect";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import useChat from "@/libs/hooks/useChat";
import useModel from "@/libs/hooks/useModel";
import { useEffect } from "react";
import bem from "react-bemthis";
import { useParams } from "react-router-dom";
import styles from "./Dashboard.module.scss";

const { block, element } = bem(styles);

export default function Dashboard() {
  const params = useParams();
  const channelId = params.channelId || "new";
  const { channel } = useChat(channelId);
  const { models, model, setModel } = useModel();

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
  }, [channelId, channel]);

  return (
    <>
      <Sidebar />
      <div className={block()}>
        <div className={element("header")}>
          <div className={element("title")}>
            <ModelSelect
              value={model}
              onModelSelect={handleModelChange}
              models={models}
            />
          </div>
          <Button icon>
            <Icon name="upload" />
          </Button>
        </div>
        <main data-theme="inner" className={element("body")}>
          <Chatbox key={channelId} model={model} channelId={channelId} />
        </main>
      </div>
    </>
  );
}
