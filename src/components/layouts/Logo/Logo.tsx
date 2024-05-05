import Icon from "@/components/ui/Icon";
import classNames from "classnames";
import bem from "react-bemthis";
import styles from "./Logo.module.scss";

const { block } = bem(styles);

type Props = {
  className?: string;
};

export default function Logo({ className }: Props) {
  return (
    <div className={classNames(className, block())}>
      <Icon name="pet_supplies" />
    </div>
  );
}
