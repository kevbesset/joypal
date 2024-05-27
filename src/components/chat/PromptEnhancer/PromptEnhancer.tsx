import Icon from "@/components/ui/Icon";
import { formatSize } from "@/libs/helpers/number";
import useModel from "@/libs/hooks/useModel";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import classNames from "classnames";
import { useState } from "react";
import bem from "react-bemthis";
import { useTranslation } from "react-i18next";
import styles from "./PromptEnhancer.module.scss";

const { block, element } = bem(styles);

export default function PromptEnhancer({ ...props }) {
  const [magicButtonHover, setMagicButtonHover] = useState(false);
  const { model, models, setModel } = useModel();
  const { t } = useTranslation();

  function handleMouseOver() {
    setMagicButtonHover(true);
  }

  function handleMouseOut() {
    setMagicButtonHover(false);
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          onMouseEnter={handleMouseOver}
          onMouseLeave={handleMouseOut}
          className={classNames(block(), props.className)}
        >
          <Icon name="language" fill={magicButtonHover} />
          <code className={element("currentModel")}>{model}</code>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={16}
          className={element("dropdown")}
        >
          {models.map((m) => (
            <DropdownMenu.Item
              key={m.name}
              className={element("item", {
                active: m.name === model,
              })}
              onClick={() => setModel(m.name)}
            >
              <span className={element("label")}>{m.name}</span>
              {m.size && (
                <span className={element("size")}>{formatSize(m.size)}GB</span>
              )}
            </DropdownMenu.Item>
          ))}
          <DropdownMenu.Separator className={element("separator")} />
          <DropdownMenu.Item className={element("item")}>
            <Icon name="download" />
            {t("chatbox.prompt.enhancer.moreModel")}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
