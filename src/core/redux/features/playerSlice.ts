import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface PlayerState {
  playerNumber: number;
}

const initialState: PlayerState = {
  playerNumber: -1,
};

export const userSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayerNumber: (state, action: PayloadAction<number>) => {
      state.playerNumber = action.payload;
    },
  },
});

export const { setPlayerNumber } = userSlice.actions;

export const getUser = (state: RootState) => state.player.playerNumber;

export default userSlice.reducer;
