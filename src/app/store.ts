import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import toolbarReducer from '../features/toolbar/toolbarSlice';

export const store = configureStore({
  reducer: {
    toolbar: toolbarReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
