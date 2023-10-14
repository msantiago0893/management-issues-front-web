import { createSlice } from '@reduxjs/toolkit';
import { createIssue, deleteIssue, issueById, issues, updateIssue } from '../asyncThunk/issue.thunk';

const issueSlice = createSlice({
  name: 'issues',
  initialState: {
    data: [],
    issue: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(issues.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(issueById.fulfilled, (state, action) => {
        state.issue = action.payload;
      })
      .addCase(createIssue.fulfilled, (state: any, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateIssue.fulfilled, (state: any, action) => {
        const updatedIssue = action.payload;
        const index = state.data.findIndex((issue: any) => issue.id === updatedIssue.id);
        if (index !== -1) {
          state.data[index] = updatedIssue;
        }
      })
      .addCase(deleteIssue.fulfilled, (state, action) => {
        const issueId = action.payload;
        state.data = state.data.filter((issue: any) => issue.id !== issueId);
      });
  },
});

export default issueSlice.reducer;
