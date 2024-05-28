import classNames from "classnames";
import { HTMLAttributes, MouseEventHandler, PropsWithChildren } from "react";
import bem from "react-bemthis";
import styles from "./Button.module.scss";

const { block } = bem(styles);

type Props = HTMLAttributes<HTMLButtonElement> &
  PropsWithChildren & {
    className?: string;
    type?: "submit" | "button";
    rounded?: boolean;
    highlight?: boolean;
    secondary?: boolean;
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
  secondary,
  disabled,
  rounded,
  icon,
  ...props
}: Props) {
  return (
    <button
      {...props}
      type={type || "button"}
      disabled={disabled}
      className={classNames(
        className,
        block({
          icon,
          highlight,
          secondary,
          disabled,
          rounded,
        })
      )}
    >
      {children}
    </button>
  );
}
