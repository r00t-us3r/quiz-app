import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
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
    setLoading(state, action) {
      state.isLoading = action.loading;
    }
  },
});

export const { signIn, signOut, restoreToken, setLoading } = AuthSlice.actions;

export default AuthSlice.reducer;
