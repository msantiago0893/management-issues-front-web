import { createSlice } from '@reduxjs/toolkit';
import {
  issueByIdClosed,
  issueByIdConsult,
  issueByIdInsert,
  issueByIdOpen,
  movements
} from '../asyncThunk/dashboard.thunk';

const dashboardSlice = createSlice({
  name: 'issues',
  initialState: {
    data: [],
    movement: null,
    totalConsult: 0,
    totalInsert: 0,
    totalOpen: 0,
    totalResolved: 0

  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(movements.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(issueByIdConsult.fulfilled, (state, action:any) => {
        state.totalConsult = action.payload.executionCount || 0;
      })
      .addCase(issueByIdInsert.fulfilled, (state, action:any) => {
        state.totalInsert = action.payload.executionCount || 0;
      })
      .addCase(issueByIdOpen.fulfilled, (state, action:any) => {
        state.totalOpen = action.payload.executionCount || 0;
      })
      .addCase(issueByIdClosed.fulfilled, (state, action:any) => {
        state.totalResolved = action.payload.executionCount || 0;
      });
  },
});

export default dashboardSlice.reducer;
