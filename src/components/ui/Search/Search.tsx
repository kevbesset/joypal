import bem from "react-bemthis";
import Icon from "../Icon";
import styles from "./Search.module.scss";

const { block, element } = bem(styles);

type Props = {
  name?: string;
  placeholder?: string;
};

export default function Search({
  name = "search",
  placeholder = "Search...",
}: Props) {
  return (
    <div className={block()}>
      <input
        type="search"
        name={name}
        placeholder={placeholder}
        className={element("input")}
      />
      <Icon name="search" className={element("icon")} />
    </div>
  );
}
