import { ChangeEvent } from "react";
import bem from "react-bemthis";
import Icon from "../Icon";
import styles from "./Search.module.scss";

const { block, element } = bem(styles);

type Props = {
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export default function Search({
  name = "search",
  placeholder = "Search...",
  value,
  onChange,
}: Props) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event.target.value);
  }

  return (
    <div className={block()}>
      <input
        type="search"
        name={name}
        placeholder={placeholder}
        className={element("input")}
        value={value}
        onChange={handleChange}
      />
      <Icon name="search" className={element("icon")} />
    </div>
  );
}
