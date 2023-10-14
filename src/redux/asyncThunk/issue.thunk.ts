import { createAsyncThunk } from "@reduxjs/toolkit";
import { setError } from "../slices/app.slice";
import { showNotification } from "../../utils/notifications";
import axiosApp from "../../api/axios";

export const formatDate = (date: any) => {
  const newDate = new Date(date);
  const day = newDate.getDate().toString().padStart(2, '0');
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
  const year = newDate.getFullYear();

  return `${day}/${month}/${year}`;
};

export const issues = createAsyncThunk(
  'issues/fetchIssues',
  async () => {
    const response = await axiosApp.get('');

    let data = response.data.map((item: any) => {
      item.creationAt = formatDate(item.creationAt);
      item.status = item.status === 'OPEN' ? 'ABIERTO' :
                    item.status === 'CLOSED' ? 'CERRADO' : 'EN PROGRESO';
      return item;
    });

    return data;
  }
);

export const issueById = createAsyncThunk(
  'issues/fetchIssueById',
  async (id: any) => {
    const { data } = await axiosApp.get(`/${id}`);

    data.creationAt = formatDate(data.creationAt);
    return data;
  }
);

export const createIssue = createAsyncThunk(
  'issues/createIssue',
  async (issue: any, { dispatch }) => {
    try {
      const response = await axiosApp.post('', issue);

      showNotification('Se agregó con éxito la incidencia');

      response.data.creationAt = formatDate(issue.creationAt);
      return response.data;
    } catch (error) {
      console.log('Error crear');
      dispatch(setError(true));
    }
  }
);

export const updateIssue = createAsyncThunk(
  'issues/updateIssue',
  async (issue: any, { dispatch }) => {
    try {
      const { id, ...updateData } = issue;
      await axiosApp.put(`/${id}`, updateData);

      showNotification('Se ha actualizado con éxito la incidencia');

      issue.creationAt = formatDate(issue.creationAt);
      return issue;
    } catch (error) {
      dispatch(setError(true));
    }
  }
);

export const deleteIssue = createAsyncThunk(
  'issues/deleteIssue',
  async (id: number, { dispatch }) => {
    try {
      await axiosApp.delete(`/${id}`);

      showNotification('Se ha eliminado con éxito la incidencia');

      return id;
    } catch (error) {
      dispatch(setError(true));
    }
  }
);
