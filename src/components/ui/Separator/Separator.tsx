import { PropsWithChildren } from "react";
import bem from "react-bemthis";
import styles from "./Separator.module.scss";

const { block } = bem(styles);

export default function Separator({ children }: PropsWithChildren) {
  return <div className={block()}>{children}</div>;
}
