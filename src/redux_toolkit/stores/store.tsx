import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../slices/authSlice';
import { contactReducer } from '../slices/contactSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    contact: contactReducer,
  },
  //if dispatch isnot receiving action.payload proper in proper format
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
