import Icon from "@/components/ui/Icon";
import { ChatMessage } from "@/types/Chat.type";
import bem from "react-bemthis";
import styles from "./MessageData.module.scss";

const { block, element } = bem(styles);

export default function MessageData(message: ChatMessage) {
  return (
    <div className={block(message.role)}>
      <dl className={element("item")}>
        <dt className={element("label")}>
          <Icon name="language" />
        </dt>
        <dd className={element("value")}>{message.model}</dd>
      </dl>
      {/* {message.total_duration && (
        <dl className={element("item")}>
          <dt className={element("label")}>
            <Icon name="hourglass_top" />
          </dt>
          <dd className={element("value")}>
            {formatNumber(message.total_duration / 1000000)}ms
          </dd>
        </dl>
      )}
      {message.prompt_eval_count && (
        <dl className={element("item")}>
          <dt className={element("label")}>
            <Icon name="input" />
          </dt>
          <dd className={element("value")}>
            {formatNumber(message.prompt_eval_count)} tokens
          </dd>
        </dl>
      )}
      {message.eval_count && (
        <dl className={element("item")}>
          <dt className={element("label")}>
            <Icon name="output" />
          </dt>
          <dd className={element("value")}>
            {formatNumber(message.eval_count)} tokens
          </dd>
        </dl>
      )} */}
    </div>
  );
}
