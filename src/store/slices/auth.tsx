import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  buisnessId: string | null;
  customerId: string | null;
}

const initialState: AuthState = {
  token: null,
  buisnessId: null,
  customerId: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
      const { token, buisnessId, customerId } = action.payload;
      state.token = token;
      state.buisnessId = buisnessId;
      state.customerId = customerId;
    },
    logout: (state) => {
      state.token = null;
      state.buisnessId = null;
      state.customerId = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions; // Fixed the action names here
export default authSlice.reducer;
