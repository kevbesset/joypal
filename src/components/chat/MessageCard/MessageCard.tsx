import Icon from "@/components/ui/Icon";
import bem from "react-bemthis";
import styles from "./MessageCard.module.scss";

const { block, element } = bem(styles);

type Props = {
  active?: boolean;
};

export default function MessageCard({ active }: Props) {
  return (
    <div className={block({ active })}>
      <div className={element("icon")}>
        <Icon name="pet_supplies" />
      </div>
      <div className={element("info")}>
        <div className={element("header")}>
          <div className={element("title")}>Test message sample</div>
          <div className={element("date")}>9:34 PM</div>
        </div>
        <div className={element("content")}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos iure
          suscipit optio...
        </div>
      </div>
    </div>
  );
}
