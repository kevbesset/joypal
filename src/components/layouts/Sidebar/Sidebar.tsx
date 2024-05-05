import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import bem from "react-bemthis";
import styles from "./Sidebar.module.scss";

const { block, element } = bem(styles);

export default function Sidebar() {
  return (
    <aside className={block()}>
      <div className={element("header")}>
        <div className={element("title")}>My Chats</div>
        <Button highlight icon>
          <Icon name="add" />
        </Button>
        <Button icon>
          <Icon name="more_horiz" />
        </Button>
      </div>
    </aside>
  );
}
