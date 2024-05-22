// src/features/infoIcon/infoIconSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface InfoIconState {
  hidden: boolean;
}

const initialState: InfoIconState = {
  hidden: false,
};

const infoIconSlice = createSlice({
  name: 'infoIcon',
  initialState,
  reducers: {
    toggleHidden: (state) => {
      state.hidden = !state.hidden;
    },
  },
});

export const { toggleHidden } = infoIconSlice.actions;

export default infoIconSlice.reducer;
