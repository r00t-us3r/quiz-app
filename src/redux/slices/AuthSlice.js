import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isSignout: false,
  userToken: null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn(state, action) {
      console.log('sign in');
      state.isSignout = false;
      state.userToken = action.payload.userToken;
    },
    signOut(state) {
      console.log('sign out');
      state.isSignout = true;
      state.userToken = null;
    },
    restoreToken(state, action) {
      console.log('restore token');
      state.isLoading = false;
      state.userToken = action.payload.userToken;
    },
  },
});

export const { signIn, signOut, restoreToken } = AuthSlice.actions;

export default AuthSlice.reducer;
