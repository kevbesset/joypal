import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import useVerticalTracer from "@/libs/hooks/useVerticalTracer";
import { useEffect, useRef } from "react";
import bem from "react-bemthis";
import { Link, useMatches } from "react-router-dom";
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
    icon: "settings",
    to: "/settings",
  },
];

export default function Nav() {
  const matches = useMatches();
  const listRef = useRef(null);
  const activeSelector = element("item", "active").split(" ").pop();
  const { styles, refresh } = useVerticalTracer(
    listRef,
    activeSelector as string,
    -8
  );

  useEffect(() => {
    refresh();
  }, [matches]);

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
                active: matches.find((match) => match.pathname === menuItem.to),
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
