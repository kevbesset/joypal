import Icon from "@/components/ui/Icon";
import useModel from "@/libs/hooks/useModel";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import classNames from "classnames";
import { useState } from "react";
import bem from "react-bemthis";
import styles from "./PromptEnhancer.module.scss";

const { block, element } = bem(styles);

export default function PromptEnhancer({ ...props }) {
  const [magicButtonHover, setMagicButtonHover] = useState(false);
  const { model, models, setModel } = useModel();

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
          <Icon name="rocket" fill={magicButtonHover} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={8}
          className={element("dropdown")}
        >
          <DropdownMenu.Item className={element("item")}>
            <Icon name="rocket_launch" />
            <span className={element("label")}>Activer le super prompt</span>
          </DropdownMenu.Item>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className={element("item")}>
              <Icon name="language" />
              <span className={element("label")}>Changer de modèle</span>
              <Icon name="arrow_right" className={element("icon")} />
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                sideOffset={4}
                className={element("dropdown")}
                collisionPadding={20}
              >
                {models.map((m) => (
                  <DropdownMenu.Item
                    key={m.name}
                    className={element("item", {
                      active: m.name === model,
                    })}
                    onClick={() => setModel(m.name)}
                  >
                    {m.name}
                  </DropdownMenu.Item>
                ))}
                <DropdownMenu.Separator className={element("separator")} />
                <DropdownMenu.Item className={element("item")}>
                  Voir d'autres modèles
                </DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
