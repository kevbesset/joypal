import Button from "@/components/ui/Button";
import Dialog from "@/components/ui/Dialog";
import Icon from "@/components/ui/Icon";
import { useAppSelector } from "@/store";
import classNames from "classnames";
import { useState } from "react";
import bem from "react-bemthis";
import { useTranslation } from "react-i18next";
import Select, { SingleValue } from "react-select";
import styles from "./PromptTemplate.module.scss";

const { block, element } = bem(styles);

type Props = {
  onSubmit: () => void;
  isTemplate?: boolean;
  isEmpty?: boolean;
  className?: string;
};

type Option = {
  label: string;
  value: string;
};

type ClassState = {
  isFocused?: boolean;
  isSelected?: boolean;
};

export default function PromptTemplate({
  onSubmit,
  isTemplate,
  isEmpty,
  className,
}: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<string>();
  const options = useAppSelector((state) =>
    state.chat.templates.map((option) => ({
      label: option.title,
      value: option.id,
    }))
  );

  const classList = {
    control: (state: ClassState) =>
      element("control", {
        focus: state.isFocused,
      }),
    menuList: () => element("list"),
    indicatorsContainer: () => element("indicator"),
    option: (state: ClassState) =>
      element("option", {
        focus: state.isFocused,
        selected: state.isSelected,
      }),
    placeholder: () => element("placeholder"),
  };

  function onSelectChange(option: SingleValue<Option>) {
    if (option) {
      setCurrentTemplate(option.value);
    }
  }

  function handleClickSubmit() {
    onSubmit();
  }

  return (
    <>
      <Button
        className={classNames(className, block({ active: isTemplate }))}
        disabled={isTemplate || isEmpty}
        onClick={() => setOpen(true)}
      >
        <Icon name={isTemplate ? "check" : "bookmark"} />
        {t(
          `chatbox.prompt.actions.${
            isTemplate ? "alreadyTempalte" : "template"
          }`
        )}
      </Button>
      <Dialog
        open={open}
        onChange={setOpen}
        title={t("chatbox.prompt.template.title")}
        subtitle={t("chatbox.prompt.template.subtitle")}
      >
        <Select
          unstyled
          className={element("select")}
          classNames={classList}
          options={options}
          value={options.find((option) => option.value === currentTemplate)}
          onChange={onSelectChange}
          placeholder={t("chatbox.prompt.template.placeholder")}
        />
        <div className={element("footer")}>
          <Button
            highlight
            className={element("button")}
            onClick={handleClickSubmit}
            disabled={!!currentTemplate}
          >
            {t("chatbox.prompt.template.update")}
          </Button>
          <Button onClick={() => setOpen(false)} className={element("button")}>
            {t("chatbox.prompt.template.cancel")}
          </Button>
        </div>
      </Dialog>
    </>
  );
}
