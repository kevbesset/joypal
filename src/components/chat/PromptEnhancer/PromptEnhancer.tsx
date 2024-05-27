import Icon from "@/components/ui/Icon";
import useModel from "@/libs/hooks/useModel";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import classNames from "classnames";
import { useState } from "react";
import bem from "react-bemthis";
import { useTranslation } from "react-i18next";
import styles from "./PromptEnhancer.module.scss";

const { block, element } = bem(styles);

type Props = {
  isNew?: boolean;
  className?: string;
  superPromptEnabled?: boolean;
  onSuperPromptToggle: () => void;
};

export default function PromptEnhancer({
  isNew,
  superPromptEnabled,
  onSuperPromptToggle,
  ...props
}: Props) {
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
          <Icon
            name={
              isNew
                ? superPromptEnabled
                  ? "rocket_launch"
                  : "rocket"
                : "language"
            }
            fill={magicButtonHover}
          />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={8}
          className={element("dropdown")}
        >
          {isNew ? (
            <>
              <DropdownMenu.Item
                className={element("item")}
                onClick={onSuperPromptToggle}
              >
                <Icon name={superPromptEnabled ? "rocket" : "rocket_launch"} />
                <span className={element("label")}>
                  {t(
                    `chatbox.prompt.enhancer.${
                      superPromptEnabled ? "disable" : "enable"
                    }SuperPrompt`
                  )}
                </span>
              </DropdownMenu.Item>
              <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger className={element("item")}>
                  <Icon name="language" />
                  <span className={element("label")}>
                    {t("chatbox.prompt.enhancer.changeModel")}
                  </span>
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
                      <Icon name="download" />
                      {t("chatbox.prompt.enhancer.moreModel")}
                    </DropdownMenu.Item>
                  </DropdownMenu.SubContent>
                </DropdownMenu.Portal>
              </DropdownMenu.Sub>
            </>
          ) : (
            <>
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
                <Icon name="download" />
                {t("chatbox.prompt.enhancer.moreModel")}
              </DropdownMenu.Item>
            </>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
