import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { id:null, token: null, username: null, firstname:null },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.id = action.payload.id;
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
      state.value.firstname = action.payload.firstname;
    },
    logout: (state) => {
      state.value.id = null;
      state.value.token = null;
      state.value.username = null;
      state.value.firstname = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
