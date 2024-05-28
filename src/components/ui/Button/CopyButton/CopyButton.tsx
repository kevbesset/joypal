import { clipboardCopy } from "@/libs/helpers/clipboard";
import classNames from "classnames";
import { useState } from "react";
import bem from "react-bemthis";
import { useTranslation } from "react-i18next";
import Icon from "../../Icon";
import Button from "../Button";
import styles from "./CopyButton.module.scss";

const { block, element } = bem(styles);

type Props = {
  copyMessage: string;
  className?: string;
  iconClassName?: string;
  labelClassName?: string;
  compact?: boolean;
};

export default function CopyButton({
  copyMessage,
  className,
  iconClassName,
  labelClassName,
  compact,
  ...props
}: Props) {
  const [isCopied, setIsCopied] = useState(false);
  const { t } = useTranslation();

  function handleCopy() {
    setIsCopied(true);
    clipboardCopy(copyMessage);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }

  function renderLabel() {
    if (isCopied) {
      return t("actions.copySuccess");
    } else if (!compact) {
      return t("actions.copy");
    }

    return "";
  }

  return (
    <Button
      className={classNames(className, block())}
      disabled={isCopied}
      onClick={handleCopy}
      {...props}
    >
      <Icon
        name={isCopied ? "check" : "content_copy"}
        className={classNames(iconClassName, element("icon"))}
      />
      <span className={classNames(labelClassName, element("label"))}>
        {renderLabel()}
      </span>
    </Button>
  );
}
