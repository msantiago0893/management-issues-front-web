import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slices/app.slice";
import issueSlice from "./slices/issue.slice";
import dashboardSlice from "./slices/dashboard.slice";

export const store = configureStore({
  reducer: {
    app: appSlice,
    issue: issueSlice,
    dashboard: dashboardSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;