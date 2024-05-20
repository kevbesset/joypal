import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { useAppDispatch } from "@/store";
import { create } from "@/store/chatStore";
import { ChangeEvent, useRef } from "react";
import bem from "react-bemthis";
import { toast } from "react-toastify";
import styles from "./UploadChat.module.scss";

const { block, element } = bem(styles);

export default function UploadChat() {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  function handleClick() {
    inputRef.current?.click();
  }

  function isValidChannel(channel: unknown) {
    return (
      channel &&
      typeof channel === "object" &&
      "id" in channel &&
      "title" in channel &&
      "messages" in channel
    );
  }

  function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.addEventListener("load", (event: ProgressEvent<FileReader>) => {
        const content = event.target?.result;

        if (content) {
          try {
            const channel = JSON.parse(content as string);
            if (isValidChannel(channel)) {
              dispatch(create(channel));
            }
          } catch (error) {
            console.error(error);
            toast(
              "Error: the file doesn't seem to be a channel or is with an obsolete format",
              {
                type: "error",
              }
            );
          }
        }
      });

      reader.onerror = () => {
        console.error("Error while reading the file");
      };

      reader.readAsText(file);
    }
  }

  return (
    <label className={block()}>
      <Button icon className={element("button")} onClick={handleClick}>
        <Icon name="download" />
      </Button>
      <input
        ref={inputRef}
        type="file"
        name="upload_chat"
        id="upload_chat"
        className={element("input")}
        onChange={handleFileUpload}
      />
    </label>
  );
}
