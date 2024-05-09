import { RootState } from "@/store";
import { ChatChannel, ChatMessage } from "@/types/Chat.type";
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";

type ChatState = {
  channels: ChatChannel[];
};

const initialState: ChatState = {
  channels: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    update: (
      state,
      action: PayloadAction<{ channelId: string; messages: ChatMessage[] }>
    ) => {
      // Clear empty
      state.channels = state.channels.filter((chan) => chan.messages?.length);

      const channelIndex = state.channels.findIndex(
        (chan) => chan.id === action.payload.channelId
      );

      if (channelIndex >= 0) {
        state.channels[channelIndex].messages = action.payload.messages;
      } else {
        state.channels.push({
          id: action.payload.channelId,
          messages: action.payload.messages,
        });
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { update } = chatSlice.actions;

const selectChannels = (state: RootState) => state.chat.channels;

export const selectAvailableChannels = createSelector(
  [selectChannels],
  (channels) => channels.filter((chan) => chan.messages.length)
);

export default chatSlice.reducer;
