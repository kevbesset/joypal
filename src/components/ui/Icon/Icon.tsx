import classNames from "classnames";
import bem from "react-bemthis";
import styles from "./Icon.module.scss";

const { block } = bem(styles);

type Props = {
  className?: string;
  name: string;
  fill?: boolean;
};

export default function Icon({ name, fill, className, ...props }: Props) {
  return (
    <span
      className={classNames(className, block(["material", { fill }]))}
      data-icon={name}
      {...props}
    ></span>
  );
}
