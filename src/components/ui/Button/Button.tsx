import classNames from "classnames";
import { PropsWithChildren } from "react";
import bem from "react-bemthis";
import styles from "./Button.module.scss";

const { block } = bem(styles);

type Props = PropsWithChildren & {
  className?: string;
  type?: "submit" | "button";
  highlight?: boolean;
  icon?: boolean;
};

export default function Button({
  children,
  className,
  type,
  highlight,
  icon,
}: Props) {
  return (
    <button
      type={type || "button"}
      className={classNames(
        className,
        block({
          icon,
          highlight,
        })
      )}
    >
      {children}
    </button>
  );
}
