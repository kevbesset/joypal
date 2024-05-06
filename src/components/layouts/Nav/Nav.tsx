import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import useVerticalTracer from "@/libs/hooks/useVerticalTracer";
import { useEffect, useRef, useState } from "react";
import bem from "react-bemthis";
import styles from "./Nav.module.scss";
import tracer from "./nav-tracer.png";

const { block, element } = bem(styles);

const menu = [
  {
    icon: "chat_bubble",
  },
  {
    icon: "storefront",
  },
  {
    icon: "published_with_changes",
  },
  {
    icon: "settings",
  },
];

export default function Nav() {
  const [activePage, setActivePage] = useState(menu[0].icon);
  const listRef = useRef(null);
  const activeSelector = element("item", "active").split(" ").pop();
  const { styles, refresh } = useVerticalTracer(
    listRef,
    activeSelector as string,
    -8
  );

  useEffect(() => {
    refresh();
  }, [activePage]);

  return (
    <div className={block()}>
      <img
        src={tracer}
        alt=""
        className={element("tracer")}
        height={47}
        style={styles}
      />
      <nav ref={listRef} className={element("list")}>
        {menu.map((menuItem) => (
          <Button
            key={menuItem.icon}
            icon
            className={element("item", {
              active: activePage === menuItem.icon,
            })}
            onClick={() => setActivePage(menuItem.icon)}
          >
            <Icon name={menuItem.icon} />
          </Button>
        ))}
      </nav>
    </div>
  );
}
