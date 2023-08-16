import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from './storage';
import { IUser } from '../types';
import thunk from 'redux-thunk';

export interface AuthState {
  userProfile: IUser | null;
}

const persistConfig = {
  key: 'root',
  storage: storage,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: { userProfile: null } as AuthState,
  reducers: {
    addUser(state: AuthState, action: PayloadAction<IUser>) {
      state.userProfile = action.payload;
    },
    removeUser(state: AuthState) {
      state.userProfile = null;
    },
  },
});

export const { addUser, removeUser } = authSlice.actions;

const persistedReducer = persistReducer(persistConfig, authSlice.reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
