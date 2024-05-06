import useTracer from "@/libs/hooks/useTracer";
import { useEffect, useRef } from "react";
import bem from "react-bemthis";
import Badge from "../Badge";
import Icon from "../Icon";
import styles from "./Tabs.module.scss";

const { block, element } = bem(styles);

type Tab = {
  key: string;
  count?: number;
  icon?: string;
  label: string;
};

type Props = {
  tabs: Tab[];
  active: string;
  onTabChange: (activeTab: string) => void;
};

export default function Tabs({ tabs, active, onTabChange }: Props) {
  const listRef = useRef(null);
  const activeSelector = element("item", "active").split(" ").pop();
  const { styles, refresh } = useTracer(listRef, activeSelector as string);

  useEffect(() => {
    refresh();
  }, [active]);

  if (tabs.length <= 1) return "";
  return (
    <div className={block()}>
      <div className={element("tracer")} style={styles}></div>
      <div ref={listRef} className={element("list")}>
        {tabs &&
          tabs.map((tab) => {
            const Component = active === tab.key ? "button" : "div";
            return (
              <Component
                key={tab.key}
                className={element("item", { active: active === tab.key })}
                onClick={() => onTabChange(tab.key)}
              >
                {tab.icon && (
                  <Icon name={tab.icon} fill className={element("icon")} />
                )}
                <span className={element("text")}>{tab.label}</span>
                {tab.count && (
                  <Badge highlight={active === tab.key}>{tab.count}</Badge>
                )}
              </Component>
            );
          })}
      </div>
    </div>
  );
}
