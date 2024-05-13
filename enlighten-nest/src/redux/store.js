import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import postReducer from './post/PostSlice'
import {persistStore,persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import themeReducer from './theme/ThemeSlice';

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  currentPost: postReducer
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
})

export const persistor = persistStore(store);