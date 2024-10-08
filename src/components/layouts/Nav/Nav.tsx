import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import useVerticalTracer from "@/libs/hooks/useVerticalTracer";
import { useEffect, useRef } from "react";
import bem from "react-bemthis";
import { Link, useLocation } from "react-router-dom";
import styles from "./Nav.module.scss";
import tracer from "./nav-tracer.png";

const { block, element } = bem(styles);

const menu = [
  {
    icon: "chat_bubble",
    to: "/",
  },
  {
    icon: "storefront",
    to: "/store",
  },
  {
    icon: "published_with_changes",
    to: "/scenario",
  },
  {
    icon: "diversity_1",
    to: "/pals",
  },
  {
    icon: "settings",
    to: "/settings",
  },
];

export default function Nav() {
  const location = useLocation();
  const listRef = useRef(null);
  const activeSelector = element("item", "active").split(" ").pop();
  const { styles, refresh } = useVerticalTracer(
    listRef,
    activeSelector as string,
    -8
  );

  function itemActive(item: { icon: string; to: string }) {
    if (item.to === "/") {
      return location.pathname === "/" || location.pathname.startsWith("/c");
    }

    return location.pathname.startsWith(item.to);
  }

  useEffect(() => {
    refresh();
  }, [location]);

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
          <Link key={menuItem.icon} to={menuItem.to}>
            <Button
              icon
              className={element("item", {
                active: itemActive(menuItem),
              })}
            >
              <Icon name={menuItem.icon} />
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  );
}
