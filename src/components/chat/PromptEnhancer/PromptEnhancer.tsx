import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import classNames from "classnames";
import { useState } from "react";
import bem from "react-bemthis";
import styles from "./PromptEnhancer.module.scss";

const { block } = bem(styles);

export default function PromptEnhancer({ ...props }) {
  const [magicButtonHover, setMagicButtonHover] = useState(false);

  function handleMouseOver() {
    setMagicButtonHover(true);
  }

  function handleMouseOut() {
    setMagicButtonHover(false);
  }

  return (
    <Button
      {...props}
      icon
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOut}
      className={classNames(block(), props.className)}
    >
      <Icon name="rocket" fill={magicButtonHover} />
    </Button>
  );
}
