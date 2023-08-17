import {
  createSlice,
  createAsyncThunk,
  configureStore,
  PayloadAction,
  AnyAction,
} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from './storage';
import { IUser } from '../types';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { BASE_URL } from '../utils';
import axios from 'axios';

export interface AuthState {
  userProfile: IUser | null;
  users: IUser[];
}

const persistConfig = {
  key: 'root',
  storage: storage,
};

export const fetchAllUsers = createAsyncThunk(
  'auth/fetchAllUsers',
  async () => {
    const response = await axios.get(`${BASE_URL}/api/users`);
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: { userProfile: null, users: [] } as AuthState,
  reducers: {
    addUser(state: AuthState, action: PayloadAction<IUser>) {
      state.userProfile = action.payload;
    },
    removeUser(state: AuthState) {
      state.userProfile = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllUsers.fulfilled,
      (state: AuthState, action: PayloadAction<IUser[]>) => {
        state.users = action.payload;
      }
    );
  },
});

export const { addUser, removeUser } = authSlice.actions;

const persistedReducer = persistReducer(persistConfig, authSlice.reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
