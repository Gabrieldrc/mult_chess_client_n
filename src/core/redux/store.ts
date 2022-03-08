import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userReducer from "./features/userSlice";
import playerReducer from "./features/playerSlice";

const createCurstomStore = () => {
  const middleware = [];
  if (process.env.NODE_ENV == "development") {
    middleware.push(logger);
  }
  const devTools = process.env.NODE_ENV !== "production";

  return configureStore({
    reducer: {
      user: userReducer,
      player: playerReducer,
    },
    middleware,
    devTools,
  });
};

export const store = createCurstomStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
