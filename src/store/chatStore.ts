import { getFromStorage, setFromStorage } from "@/libs/helpers/storage";
import { uid } from "@/libs/helpers/uniqueId";
import { RootState } from "@/store";
import { ChatChannel, ChatMessage, ChatTemplate } from "@/types/Chat.type";
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";

type ChatState = {
  channels: ChatChannel[];
  templates: ChatTemplate[];
};

const initialState: ChatState = {
  channels: getFromStorage("channels") || [],
  templates: getFromStorage("templates") || [],
};

export const chatStore = createSlice({
  name: "chat",
  initialState,
  reducers: {
    write: (
      state,
      action: PayloadAction<{ channelId: string; message: ChatMessage }>
    ) => {
      const { channelId, message } = action.payload;

      const channelIndex = state.channels.findIndex(
        (chan) => chan.id === channelId
      );

      if (channelIndex < 0) {
        // No channel found, let's create it
        state.channels.push({
          id: channelId,
          title: message.content,
          messages: [message],
        });
      } else {
        // Channel found, let's update it
        const channel = state.channels[channelIndex];
        const messageIndex = channel.messages.findIndex(
          (msg) => msg.id === message.id
        );

        if (messageIndex < 0) {
          // No message found, let's add it
          state.channels[channelIndex].messages = [
            ...channel.messages,
            message,
          ];
        } else {
          // Message found, let's update it
          state.channels[channelIndex].messages[messageIndex] = message;
        }
      }

      setFromStorage("channels", state.channels);
    },
    save: (state, action: PayloadAction<string>) => {
      const channelIndex = state.channels.findIndex(
        (chan) => chan.id === "new"
      );

      if (channelIndex >= 0) {
        state.channels[channelIndex].id = action.payload;
      }

      setFromStorage("channels", state.channels);
    },
    update: (state, action: PayloadAction<ChatChannel>) => {
      const channelIndex = state.channels.findIndex(
        (chan) => chan.id === action.payload.id
      );

      if (channelIndex >= 0) {
        state.channels[channelIndex] = action.payload;
      }

      setFromStorage("channels", state.channels);
    },
    remove: (state, action: PayloadAction<string>) => {
      state.channels = state.channels.filter(
        (chan) => chan.id !== action.payload
      );

      setFromStorage("channels", state.channels);
    },
    rename: (
      state,
      action: PayloadAction<{ channelId: string; name: string }>
    ) => {
      const channelIndex = state.channels.findIndex(
        (chan) => chan.id === action.payload.channelId
      );

      if (channelIndex >= 0) {
        state.channels[channelIndex].title = action.payload.name;
      }

      setFromStorage("channels", state.channels);
    },
    create: (state, action: PayloadAction<ChatChannel>) => {
      let channelId = action.payload.id;

      const channel = state.channels.find((chan) => chan.id === channelId);
      if (channel) {
        channelId = `c${uid()}`;
      }

      state.channels.push({
        ...action.payload,
        id: channelId,
      });

      setFromStorage("channels", state.channels);
    },
    saveAsTemplate: (state, action: PayloadAction<ChatTemplate>) => {
      state.templates = [...state.templates, action.payload];

      setFromStorage("templates", state.templates);
    },
    removeTemplate: (state, action: PayloadAction<string>) => {
      state.templates = state.templates.filter(
        (tem) => tem.id !== action.payload
      );

      setFromStorage("templates", state.templates);
    },
    renameTemplate: (
      state,
      action: PayloadAction<{ templateId: string; name: string }>
    ) => {
      const templateIndex = state.templates.findIndex(
        (tem) => tem.id === action.payload.templateId
      );

      if (templateIndex >= 0) {
        state.templates[templateIndex].title = action.payload.name;
      }

      setFromStorage("templates", state.templates);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  remove,
  write,
  save,
  update,
  rename,
  create,
  saveAsTemplate,
  removeTemplate,
  renameTemplate,
} = chatStore.actions;

const selectChannels = (state: RootState) => state.chat.channels;

export const selectAvailableChannels = createSelector(
  [selectChannels],
  (channels) => channels.filter((chan) => chan.messages.length)
);

export const selectChannel = (channelId: string) =>
  createSelector(
    [selectChannels],
    (channels) =>
      channels.find((chan) => chan.id === channelId) || {
        id: channelId,
        messages: [],
      }
  );

export default chatStore.reducer;
