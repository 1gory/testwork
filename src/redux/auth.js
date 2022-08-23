import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  isAuth: false
};

export const login = createAsyncThunk(
  'auth/login',
  async function (form) {
    const response = await fetch(`/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(form)
    });
    return {
      status: response.status,
      response: await response.json(),
    };
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async function (form) {
    await fetch(`/api/auth/logout`);
  }
);

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async function (form) {
    const response = await fetch(`/api/auth/check_auth`, {
      headers: {
        'Cache-Control': 'no-cache',
      },
    });

    return {
      status: response.status,
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [login.fulfilled]: (state) => {
      state.isAuth = true;
    },
    [logout.fulfilled]: (state) => {
      state.isAuth = false;
    },
    [checkAuth.fulfilled]: (state, action) => {
      state.isAuth = action.payload.status === 200;
    },
  }
})

export default authSlice.reducer;
