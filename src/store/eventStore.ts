import { RootState } from "@/store";
import { EventStore } from "@/types/Event.type";
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";

type EventState = {
  events: EventStore[];
};

const initialState: EventState = {
  events: [],
};

export const eventStore = createSlice({
  name: "event",
  initialState,
  reducers: {
    push: (state, action: PayloadAction<EventStore>) => {
      state.events = [action.payload, ...state.events];
    },
    clear: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(
        (event) => event.name !== action.payload
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { push, clear } = eventStore.actions;

const selectEvents = (state: RootState) => state.event.events;

export const selectEvent = (eventName: string) =>
  createSelector([selectEvents], (events) =>
    events.find((event) => event.name === eventName)
  );

export default eventStore.reducer;
