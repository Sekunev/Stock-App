import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import stockReducer from "../features/stockSlice";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

//! persist kütüphanesi
// persist kütüphanesi state'lerin kalıcı bir hafızada saklanmasını sağlıyor. Redux ile birlikte kullanılıyor. Bu bize örneğin sayfa yenilendiğinde state'lerin silinmemesini ve tekrar login olma gererkliliğini ortadan kaldırıyor.

// adres(https://www.npmjs.com/package/redux-persist/v/6.0.0)
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    stock: stockReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // devTools: process.env.NODE_ENV !== "production",
});
export const persistor = persistStore(store);
export default store;
