import classNames from "classnames";
import { MouseEventHandler, PropsWithChildren } from "react";
import bem from "react-bemthis";
import styles from "./Button.module.scss";

const { block } = bem(styles);

type Props = PropsWithChildren & {
  className?: string;
  type?: "submit" | "button";
  highlight?: boolean;
  icon?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function Button({
  children,
  className,
  type,
  highlight,
  icon,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
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
