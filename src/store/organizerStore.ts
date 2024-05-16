import { sortChannels } from "@/libs/helpers/sort";
import { getFromStorage } from "@/libs/helpers/storage";
import { RootState } from "@/store";
import { ChatChannelOrganizer, ChatFolder } from "@/types/Chat.type";
import { createSelector, createSlice } from "@reduxjs/toolkit";

type OrganizerState = {
  folders: ChatFolder[];
  channelLocation: ChatChannelOrganizer;
};

const initialState: OrganizerState = {
  folders: getFromStorage("folders") || [],
  channelLocation: getFromStorage("channelLocation") || {},
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    move: (state) => {
      console.log("move", state);
    },
  },
});

// Action creators are generated for each case reducer function
export const { move } = chatSlice.actions;

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

export default chatSlice.reducer;
