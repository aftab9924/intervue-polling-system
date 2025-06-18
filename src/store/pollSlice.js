import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPoll: null, 
  results: null,     
  kicked: false,     
};

const pollSlice = createSlice({
  name: 'poll',
  initialState,
  reducers: {
    setPoll: (state, action) => {
      state.currentPoll = action.payload;
      state.kicked = false; 
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
    setKicked: (state, action) => {
      state.kicked = action.payload;
    },
    clearPoll: (state) => {
      state.currentPoll = null;
      state.results = null;
      state.kicked = false;
    },
  },
});

export const { setPoll, setResults, setKicked, clearPoll } = pollSlice.actions;
export default pollSlice.reducer;
