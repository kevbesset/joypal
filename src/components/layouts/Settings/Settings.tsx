import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import bem from "react-bemthis";
import styles from "./Settings.module.scss";

const { block, element } = bem(styles);

export default function Settings() {
  return (
    <div className={block()}>
      <Button icon className={element("item")}>
        <img
          src="https://media.licdn.com/dms/image/C4E03AQGm-rwpONAatw/profile-displayphoto-shrink_400_400/0/1601377777018?e=2147483647&v=beta&t=G9A_yIODEox92NRv0f8VeEGK4XYQGPtEsFV-9e6AzXQ"
          alt=""
          width={32}
          height={32}
          className={element("avatar")}
        />
        <span className={element("formula")}>
          <span className={element("formulaText")}>PRO</span>
        </span>
      </Button>
      <Button icon className={element("item")}>
        <Icon name="logout" />
      </Button>
      <hr className={element("hr")} />
      <ThemeSwitcher />
    </div>
  );
}
