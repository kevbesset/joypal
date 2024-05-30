import Icon from "@/components/ui/Icon";
import { formatSize } from "@/libs/helpers/number";
import useModel from "@/libs/hooks/useModel";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import classNames from "classnames";
import bem from "react-bemthis";
import { useTranslation } from "react-i18next";
import styles from "./PromptModelPicker.module.scss";

const { block, element } = bem(styles);

export default function PromptModelPicker({ ...props }) {
  const { model, models, setModel } = useModel();
  const { t } = useTranslation();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={classNames(props.className, block())}>
          <Icon name="language" />
          {model}
          <Icon name="arrow_drop_down" className={element("dropdownIcon")} />
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
