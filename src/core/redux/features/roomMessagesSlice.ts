import IMessage from "@interfaces/IMessage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface RoomMessagesState {
  messages: IMessage[];
}

const initialState: RoomMessagesState = {
  messages: [],
};

export const roomMessagesSlice = createSlice({
  name: "roomMessages",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<IMessage[]>) => {
      state.messages = action.payload;
    },
    cleanMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { setMessages, cleanMessages } = roomMessagesSlice.actions;

export const getRoomMessages = (state: RootState) =>
  state.roomMessages.messages;

export default roomMessagesSlice.reducer;
