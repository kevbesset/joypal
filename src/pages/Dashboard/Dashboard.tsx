import Chatbox from "@/components/chat/Chatbox";
import Sidebar from "@/components/layouts/Sidebar";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { useAppDispatch } from "@/store";
import { clear } from "@/store/chatSlice";
import { useEffect, useState } from "react";
import bem from "react-bemthis";
import { useParams } from "react-router-dom";
import styles from "./Dashboard.module.scss";

const { block, element } = bem(styles);

export default function Dashboard() {
  const params = useParams();
  const [channelId, setChannelId] = useState(params.channelId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setChannelId(params.channelId);
    dispatch(clear());
  }, [params]);

  return (
    <>
      <Sidebar />
      <div className={block()}>
        <div className={element("header")}>
          <div className={element("title")}></div>
          <Button icon>
            <Icon name="upload" />
          </Button>
        </div>
        <main data-theme="inner" className={element("body")}>
          <Chatbox key={channelId} channelId={channelId} />
        </main>
      </div>
    </>
  );
}
