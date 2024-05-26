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
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onMouseEnter?: MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
};

export default function Button({
  children,
  className,
  type,
  highlight,
  disabled,
  icon,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: Props) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      type={type || "button"}
      disabled={disabled}
      className={classNames(
        className,
        block({
          icon,
          highlight,
          disabled,
        })
      )}
    >
      {children}
    </button>
  );
}
