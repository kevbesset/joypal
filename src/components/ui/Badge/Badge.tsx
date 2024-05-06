import { PropsWithChildren } from "react";
import bem from "react-bemthis";
import styles from "./Badge.module.scss";

const { block, element } = bem(styles);

type Props = PropsWithChildren & {
  highlight?: boolean;
};

export default function Badge({ children, highlight }: Props) {
  return (
    <div className={block({ highlight })}>
      <span className={element("inner")}>{children}</span>
    </div>
  );
}
