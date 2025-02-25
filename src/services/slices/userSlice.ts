import {
  Action,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';

import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  registerUserApi,
  updateUserApi,
  logoutApi
} from '@api';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

const getUser = createAsyncThunk('user/getUser', getUserApi);

export const loginUser = createAsyncThunk(
  'user/login',
  async (loginData: TLoginData) => {
    const response = await loginUserApi(loginData);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (registerData: TRegisterData) => {
    const response = await registerUserApi(registerData);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  const response = await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
  return response;
});

export const updateUser = createAsyncThunk('user/update', updateUserApi);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => dispatch(setIsAuthChecked(true)));
    } else {
      dispatch(setIsAuthChecked(true));
    }
  }
);

type TUserState = {
  isAuthChecked: boolean;
  loading: boolean;
  user: TUser | null;
  error: string | undefined;
};

const initialState: TUserState = {
  isAuthChecked: false,
  loading: false,
  user: null,
  error: undefined
};

interface RejectedAction extends Action {
  error: Error;
}

function isRejectedAction(action: Action): action is RejectedAction {
  return action.type.endsWith('rejected');
}

function isFulfilledAction(action: Action): boolean {
  return action.type.endsWith('fulfilled');
}

function isPendingAction(action: Action): boolean {
  return action.type.endsWith('pending');
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addMatcher(isPendingAction, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addMatcher(isFulfilledAction, (state) => {
        state.loading = false;
      });
  },
  selectors: {
    getUserInfo: (state) => state.user,
    getUserName: (state) => state.user?.name,
    getUserEmail: (state) => state.user?.email,
    getIsAuthChecked: (state) => state.isAuthChecked,
    getIsUserRequest: (state) => state.loading,
    getUserRequestError: (state) => state.error
  }
});

const { setIsAuthChecked } = userSlice.actions;
export const {
  getIsAuthChecked,
  getIsUserRequest,
  getUserRequestError,
  getUserInfo,
  getUserName,
  getUserEmail
} = userSlice.selectors;
