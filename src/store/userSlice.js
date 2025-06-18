import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: sessionStorage.getItem('studentName') || '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
      sessionStorage.setItem('studentName', action.payload);
    },
    clearName: (state) => {
      state.name = '';
      sessionStorage.removeItem('studentName');
    },
  },
});

export const { setName, clearName } = userSlice.actions;
export default userSlice.reducer;
