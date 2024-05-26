import useModel from "@/libs/hooks/useModel";
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

export default function ModelSelect() {
  const { models, model: value, setModel } = useModel();

  function onSelectChange(option: SingleValue<Option>) {
    if (option) {
      setModel(option.value);
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
