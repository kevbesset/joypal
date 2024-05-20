import { Model } from "@/types/Model.type";
import bem from "react-bemthis";
import Select, { SingleValue } from "react-select";
import styles from "./ModelSelect.module.scss";

const { block, element } = bem(styles);

type Option = {
  label: string;
  value: string;
};

type ClassState = {
  isFocused?: boolean;
  isSelected?: boolean;
};

type Props = {
  value?: string;
  onModelSelect: (model: string) => void;
  models?: Model[];
};

export default function ModelSelect({ value, onModelSelect, models }: Props) {
  function onSelectChange(option: SingleValue<Option>) {
    if (option) {
      onModelSelect(option.value);
    }
  }

  const options =
    models?.map((model) => ({
      label: model.name,
      value: model.name,
    })) || [];

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
  };

  return (
    models && (
      <Select
        className={block()}
        unstyled
        classNames={classList}
        value={options.find((option) => option.value === value)}
        isSearchable={false}
        name="model_selector"
        options={options}
        onChange={onSelectChange}
      />
    )
  );
}
