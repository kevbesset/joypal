import Chatbox from "@/components/chat/Chatbox";
import Sidebar from "@/components/layouts/Sidebar";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import bem from "react-bemthis";
import styles from "./Dashboard.module.scss";

const { block, element } = bem(styles);

export default function Dashboard() {
  return (
    <>
      <Sidebar />
      <div className={block()}>
        <div className={element("header")}>
          <div className={element("title")}>Test message sample</div>
          <Button icon>
            <Icon name="upload" />
          </Button>
        </div>
        <main data-theme="inner" className={element("body")}>
          <Chatbox />
        </main>
      </div>
    </>
  );
}
