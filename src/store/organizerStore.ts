import { getFromStorage, setFromStorage } from "@/libs/helpers/storage";
import { uid } from "@/libs/helpers/uniqueId";
import { RootState } from "@/store";
import { ChatChannelOrganizer, ChatFolder } from "@/types/Chat.type";
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { DraggingPosition, TreeItem } from "react-complex-tree";

type OrganizerState = {
  folders: ChatFolder[];
  tree: ChatChannelOrganizer[];
  positions: { index: string; position: number };
};

const initialState: OrganizerState = {
  folders: getFromStorage("folders") || [],
  tree: getFromStorage("tree") || [],
  positions: getFromStorage("position") || [],
};

export const organizerStore = createSlice({
  name: "organizer",
  initialState,
  reducers: {
    create: (state) => {
      state.folders.push({
        id: `f${uid()}`,
        name: "New folder",
      });

      setFromStorage("folders", state.folders);
    },
    rename: (
      state,
      action: PayloadAction<{ folderId: string; name: string }>
    ) => {
      const folderIndex = state.folders.findIndex(
        (folder) => folder.id === action.payload.folderId
      );

      if (folderIndex >= 0) {
        state.folders[folderIndex].name = action.payload.name;
      }

      setFromStorage("folders", state.folders);
    },
    remove: (state, action: PayloadAction<string>) => {
      state.folders = state.folders.filter(
        (folder) => folder.id !== action.payload
      );

      setFromStorage("folders", state.folders);
    },
    move: (
      state,
      action: PayloadAction<{ items: TreeItem[]; target: DraggingPosition }>
    ) => {
      const { items, target } = action.payload;
      console.log("move", { items, target });

      items.forEach((item) => {
        if (item.isFolder) {
          // is folder
        } else if (target.targetType === "item") {
          // moved into folder

          const currentPositionIndex = state.tree.findIndex(
            (t) => t.channelId === item.index
          );

          if (currentPositionIndex >= 0) {
            state.tree[currentPositionIndex].folderId =
              target.targetItem as string;
          } else {
            state.tree.push({
              channelId: item.index as string,
              folderId: target.targetItem as string,
            });
          }
        } else if (target.targetType === "between-items") {
          // move inside same folder

          const currentPositionIndex = state.tree.findIndex(
            (t) => t.channelId === item.index
          );

          if (currentPositionIndex >= 0) {
            if (target.parentItem === "root") {
              state.tree = state.tree.filter(
                (tree) => tree.channelId !== item.index
              );
            } else {
              state.tree[currentPositionIndex].folderId =
                target.parentItem as string;
            }
          } else {
            if (target.parentItem !== "root") {
              state.tree.push({
                channelId: item.index as string,
                folderId: target.parentItem as string,
              });
            }
          }
        }
      });

      setFromStorage("tree", state.tree);
    },
  },
});

// Action creators are generated for each case reducer function
export const { move, create, rename, remove } = organizerStore.actions;

export const selectFolders = (state: RootState) => state.organizer.folders;

export const selectSubfolders = (parentId?: string) =>
  createSelector([selectFolders], (folders) =>
    folders.filter((folder) => folder.parent === parentId)
  );

export default organizerStore.reducer;
