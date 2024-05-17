import Icon from "@/components/ui/Icon";
import { sortChannels } from "@/libs/helpers/sort";
import { getFromStorage, setFromStorage } from "@/libs/helpers/storage";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectAvailableChannels } from "@/store/chatStore";
import { move, selectFolders } from "@/store/organizerStore";
import { ChatChannel, ChatFolder } from "@/types/Chat.type";
import { useEffect, useState } from "react";
import bem from "react-bemthis";
import {
  ControlledTreeEnvironment,
  DraggingPosition,
  Tree,
  TreeItem,
  TreeItemIndex,
} from "react-complex-tree";
import "react-complex-tree/lib/style-modern.css";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import ChannelCard from "../ChannelCard";
import Folder from "../Folder";
import styles from "./ChannelList.module.scss";

const { block, element } = bem(styles);

export default function ChannelList() {
  const { t } = useTranslation();
  const { channelId } = useParams();
  const folders = useAppSelector(selectFolders);
  const channels = useAppSelector(selectAvailableChannels);
  const treeOrganization = useAppSelector((state) => state.organizer.tree);
  const dispatch = useAppDispatch();
  const organizer = getFromStorage("organizer") || {
    focusedItem: undefined,
    expandedItems: [],
    selectedItems: [],
  };
  const [focusedItem, setFocusedItem] = useState<TreeItemIndex>(
    organizer.focusedItem
  );
  const [expandedItems, setExpandedItems] = useState<TreeItemIndex[]>(
    organizer.expandedItems
  );
  const [selectedItems, setSelectedItems] = useState<TreeItemIndex[]>(
    organizer.selectedItems
  );

  const tree: Record<
    TreeItemIndex,
    TreeItem<ChatChannel | ChatFolder | null>
  > = {};
  if (folders?.length) {
    folders.forEach((folder) => {
      const channelIdsForThisFolder = treeOrganization
        .filter((t) => t.folderId === folder.id)
        .map((t) => t.channelId);

      tree[folder.id] = {
        index: folder.id,
        canMove: true,
        isFolder: true,
        children: [...channelIdsForThisFolder],
        data: folder,
        canRename: true,
      };
    });
  }

  if (channels?.length) {
    channels.forEach((channel) => {
      tree[channel.id] = {
        index: channel.id,
        canMove: true,
        isFolder: false,
        data: channel,
        canRename: true,
      };
    });
  }

  tree["new-chat"] = {
    index: "new-chat",
    canMove: false,
    isFolder: false,
    data: null,
    canRename: false,
  };

  tree.root = {
    index: "root",
    canMove: true,
    isFolder: true,
    children: [
      ...folders.map((folder) => folder.id),
      "new-chat",
      ...channels
        .filter(
          (channel) => !treeOrganization.find((t) => t.channelId === channel.id)
        )
        .map((channel) => channel.id),
    ],
    data: null,
    canRename: true,
  };

  function handleDrop(items: TreeItem[], target: DraggingPosition) {
    dispatch(
      move({
        items,
        target,
      })
    );
  }

  useEffect(() => {
    setFromStorage("organizer", {
      focusedItem,
      expandedItems,
      selectedItems,
    });
  }, [focusedItem, expandedItems, selectedItems]);

  return (
    <div className={block()}>
      {tree && (
        <ControlledTreeEnvironment
          items={tree}
          getItemTitle={(item) => {
            return (
              (item && item?.data && (item?.data as ChatFolder)?.name) ||
              (item?.data as ChatChannel)?.title ||
              "New chat"
            );
          }}
          canDragAndDrop={true}
          canReorderItems={true}
          canDropOnFolder={true}
          canDropOnNonFolder={false}
          canSearchByStartingTyping={false}
          viewState={{
            ["tree"]: {
              focusedItem,
              expandedItems,
              selectedItems,
            },
          }}
          onFocusItem={(item) => setFocusedItem(item.index)}
          onExpandItem={(item) =>
            setExpandedItems([...expandedItems, item.index])
          }
          onCollapseItem={(item) =>
            setExpandedItems(
              expandedItems.filter(
                (expandedItemIndex) => expandedItemIndex !== item.index
              )
            )
          }
          onSelectItems={(items) => setSelectedItems(items)}
          onDrop={handleDrop}
          renderItemArrow={({ item, context }) =>
            item.isFolder ? (
              <span className={element("icon")} {...context.arrowProps}>
                <Icon name={context.isExpanded ? "folder_open" : "folder"} />
              </span>
            ) : item.index === "new-chat" ? (
              <span className={element("icon")}>
                <Icon name="add" />
              </span>
            ) : null
          }
          renderItem={({ title, arrow, context, children }) => (
            <li
              {...context.itemContainerWithChildrenProps}
              style={{
                margin: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <button
                {...context.itemContainerWithoutChildrenProps}
                {...context.interactiveElementProps}
                style={{
                  display: "flex",
                  gap: "1em",
                  width: "100%",
                }}
              >
                {arrow}
                {title}
              </button>
              {children}
            </li>
          )}
          renderTreeContainer={({ children, containerProps }) => (
            <div {...containerProps}>{children}</div>
          )}
          renderItemsContainer={({ children, containerProps }) => (
            <ul
              {...containerProps}
              style={{
                padding: containerProps.role === undefined ? "0" : undefined,
              }}
            >
              {children}
            </ul>
          )}
        >
          <Tree treeId="tree" rootItem="root" />
        </ControlledTreeEnvironment>
      )}
      ------------------------
      {folders &&
        folders.map((folder) => <Folder key={folder.id} folder={folder} />)}
      {!!folders.length && <hr className={element("separator")} />}
      <Link to="/" className={element("newChat")}>
        <Icon name="add" />
        <span className={element("newChatText")}>
          {t("chatbox.sidebar.newChat")}
        </span>
      </Link>
      {channels &&
        channels
          .filter((channel) => channel.messages?.length)
          .sort(sortChannels)
          .map((channel) => (
            <ChannelCard
              key={channel.id}
              channel={channel}
              active={channel.id === channelId}
            />
          ))}
    </div>
  );
}
