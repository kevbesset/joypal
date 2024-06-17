import useAutosizeTextArea from "@/libs/hooks/useAutosizeTextarea";
import classNames from "classnames";
import { ChangeEvent, KeyboardEvent, useEffect, useRef } from "react";
import bem from "react-bemthis";
import styles from "./Textarea.module.scss";

const { block } = bem(styles);

type Props = {
  name: string;
  placeholder?: string;
  className?: string;
  value: string;
  onSubmit?: () => void;
  onChange: (value: string) => void;
};

export default function Textarea({
  name,
  value,
  placeholder,
  onSubmit,
  onChange,
  className,
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { manualTrigger } = useAutosizeTextArea(textareaRef.current, value);

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (!event.shiftKey && ["Enter", "NumpadEnter"].includes(event.code)) {
      event.preventDefault();
      onSubmit?.();
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
    onChange(event.target.value);
  }

  useEffect(() => {
    manualTrigger(textareaRef.current);
  });

  return (
    <textarea
      ref={textareaRef}
      name={name}
      autoFocus={true}
      autoComplete="off"
      placeholder={placeholder}
      className={classNames(block(), className)}
      value={value}
      rows={1}
      onKeyDown={handleKeyDown}
      onChange={handleInputChange}
    />
  );
}
