import { sortChannels } from "@/libs/helpers/sort";
import { getFromStorage, setFromStorage } from "@/libs/helpers/storage";
import { uid } from "@/libs/helpers/uniqueId";
import { RootState } from "@/store";
import { ChatChannelOrganizer, ChatFolder } from "@/types/Chat.type";
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";

type OrganizerState = {
  folders: ChatFolder[];
  channelLocation: ChatChannelOrganizer;
};

const initialState: OrganizerState = {
  folders: getFromStorage("folders") || [],
  channelLocation: getFromStorage("channelLocation") || {},
};

export const organizerStore = createSlice({
  name: "chat",
  initialState,
  reducers: {
    create: (state) => {
      state.folders.push({
        id: uid(),
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
    move: (state) => {
      console.log("move", state);
    },
  },
});

// Action creators are generated for each case reducer function
export const { move, create, rename, remove } = organizerStore.actions;

const selectFolders = (state: RootState) => state.organizer.folders;
const selectChannelLocation = (state: RootState) =>
  state.organizer.channelLocation;
const selectChannels = (state: RootState) => state.chat.channels;

export const selectSubfolders = (parentId?: string) =>
  createSelector([selectFolders], (folders) =>
    folders.filter((folder) => folder.parent === parentId)
  );

export const selectChannelsFromFolder = (folderId: string) =>
  createSelector(
    [selectChannelLocation, selectChannels],
    (locations, channels) => {
      const channelIdsInFolder = Object.keys(locations).filter(
        (channelId) => locations[channelId] === folderId
      );

      return channels
        .filter(
          (channel) =>
            channel.messages?.length && channelIdsInFolder.includes(channel.id)
        )
        .sort(sortChannels);
    }
  );

export const selectChannelsWithoutFolder = createSelector(
  [selectChannelLocation, selectChannels],
  (locations, channels) => {
    return channels
      .filter(
        (channel) =>
          channel.messages?.length &&
          !Object.keys(locations).includes(channel.id)
      )
      .sort(sortChannels);
  }
);

export default organizerStore.reducer;
