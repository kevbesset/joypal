import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { useClickOutside } from "@/libs/hooks/useClickOutside";
import { useAppDispatch } from "@/store";
import { remove, rename } from "@/store/organizerStore";
import { ChatFolder } from "@/types/Chat.type";
import {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  useState,
} from "react";
import bem from "react-bemthis";
import styles from "./Folder.module.scss";

const { block, element } = bem(styles);

type Props = {
  folder: ChatFolder;
  open?: boolean;
};

export default function Folder({ folder, open, ...props }: Props) {
  const [isRenaming, setIsRenaming] = useState(false);
  const itemRef = useClickOutside(handleClickOutside);
  const dispatch = useAppDispatch();

  async function handleDoubleClick() {
    await setIsRenaming(true);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(rename({ folderId: folder.id, name: event.target.value }));

    if (folder.name === "") {
      dispatch(rename({ folderId: folder.id, name: "Untitled" }));
    }
  }

  function handleSubmit(event: KeyboardEvent<HTMLInputElement>) {
    if (["Enter", "NumpadEnter", "Escape"].includes(event.code)) {
      closeRenaming();
    }
  }

  function handleFocus(event: FocusEvent<HTMLInputElement>) {
    event.target.select();
  }

  function handleClickOutside() {
    closeRenaming();
  }

  function handleEdit(event: ReactMouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsRenaming(true);
  }

  function handleRemove(event: ReactMouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    dispatch(remove(folder.id));
  }

  function closeRenaming() {
    setIsRenaming(false);

    if (folder.name === "") {
      dispatch(rename({ folderId: folder.id, name: "Untitled" }));
    }
  }

  return (
    <div
      className={block({ isRenaming })}
      ref={itemRef}
      onDoubleClick={handleDoubleClick}
      {...props}
    >
      <div className={element("icon")}>
        <Icon name={open ? "folder_open" : "folder"} />
      </div>
      {isRenaming ? (
        <input
          type="text"
          name="rename_channel"
          id="rename_channel"
          className={element("input")}
          value={folder.name}
          onChange={handleInputChange}
          onKeyDown={handleSubmit}
          onFocus={handleFocus}
          autoFocus
        />
      ) : (
        <div className={element("name")}>{folder.name}</div>
      )}
      <div className={element("action")}>
        <Button icon onClick={handleEdit} className={element("button")}>
          <Icon name="edit" />
        </Button>
        <Button
          icon
          className={element("button", "delete")}
          onClick={handleRemove}
        >
          <Icon name="delete" />
        </Button>
      </div>
    </div>
  );
}
