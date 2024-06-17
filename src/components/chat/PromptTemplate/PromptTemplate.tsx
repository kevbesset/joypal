import Button from "@/components/ui/Button";
import Dialog from "@/components/ui/Dialog";
import Icon from "@/components/ui/Icon";
import { useAppSelector } from "@/store";
import { ChatTemplate } from "@/types/Chat.type";
import classNames from "classnames";
import { useState } from "react";
import bem from "react-bemthis";
import { useTranslation } from "react-i18next";
import Select, { SingleValue } from "react-select";
import CreatableSelect from "react-select/creatable";
import styles from "./PromptTemplate.module.scss";

const { block, element } = bem(styles);

type Props = {
  onUpdate: (id: string) => void;
  onCreate: (title: string) => void;
  onUseTemplate: (template: ChatTemplate) => void;
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
  onUpdate,
  onCreate,
  onUseTemplate,
  isTemplate,
  isEmpty,
  className,
}: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<string>();
  const templates = useAppSelector((state) => state.chat.templates);
  const isFormValid = isEmpty
    ? !!templates.find((template) => template.id === currentTemplate)
    : !!currentTemplate;

  const options = templates.map((option) => ({
    label: option.title,
    value: option.id,
  }));
  const currentTemplateFound = templates.find(
    (template) => template.id === currentTemplate
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

  const Component = isEmpty ? Select : CreatableSelect;

  function onSelectChange(option: SingleValue<Option>) {
    if (option) {
      setCurrentTemplate(option.value);
    }
  }

  function handleClickSubmit() {
    if (isEmpty) {
      if (currentTemplateFound) {
        onUseTemplate(currentTemplateFound);
      }
    } else if (currentTemplate) {
      if (currentTemplateFound) {
        onUpdate(currentTemplate);
      } else {
        onCreate(currentTemplate);
      }
    }

    setOpen(false);
  }

  return (
    <>
      <Button
        className={classNames(className, block({ active: isTemplate }))}
        disabled={isTemplate}
        onClick={() => setOpen(true)}
      >
        <Icon name={isTemplate ? "check" : "bookmark"} fill={!isEmpty} />
        {t(
          `chatbox.prompt.actions.${
            isEmpty
              ? "useTemplate"
              : isTemplate
              ? "alreadyTemplate"
              : "template"
          }`
        )}
      </Button>
      <Dialog
        open={open}
        onChange={setOpen}
        title={t(`chatbox.prompt.template.title.${isEmpty ? "use" : "save"}`)}
        subtitle={t("chatbox.prompt.template.subtitle")}
      >
        <Component
          unstyled
          className={element("select")}
          classNames={classList}
          options={options}
          value={options.find((option) => option.value === currentTemplate)}
          onChange={onSelectChange}
          placeholder={t(
            `chatbox.prompt.template.placeholder.${isEmpty ? "use" : "save"}`
          )}
        />
        <div className={element("footer")}>
          <Button
            highlight
            className={element("button")}
            onClick={handleClickSubmit}
            disabled={!isFormValid}
          >
            {t(
              `chatbox.prompt.template.${
                isEmpty ? "use" : currentTemplateFound ? "update" : "create"
              }`
            )}
          </Button>
          <Button onClick={() => setOpen(false)} className={element("button")}>
            {t("chatbox.prompt.template.cancel")}
          </Button>
        </div>
      </Dialog>
    </>
  );
}
