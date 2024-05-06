import classNames from "classnames";
import { PropsWithChildren } from "react";
import bem from "react-bemthis";
import styles from "./Badge.module.scss";

const { block, element } = bem(styles);

type Props = PropsWithChildren & {
  className?: string;
  highlight?: boolean;
};

export default function Badge({ children, className, highlight }: Props) {
  return (
    <div className={classNames(className, block({ highlight }))}>
      <span className={element("inner")}>{children}</span>
    </div>
  );
}
