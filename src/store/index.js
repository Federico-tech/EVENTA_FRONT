import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import event from './event';
import filters from './filter';
import notification from './notification';
import user from './user';

// REDUCERS
const reducers = combineReducers({
  user,
  event,
  filters,
  notification,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

// STORE
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk, logger],
});

export const persistor = persistStore(store);

export const awaitRehydrate = async () => {
  const state = store.getState();
  if (!state._persist.rehydrated) {
    console.log('not Rehydrate');
    await timeout(10);
    return awaitRehydrate();
  } else {
    console.log('Rehydrate');
    return true;
  }
};

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
