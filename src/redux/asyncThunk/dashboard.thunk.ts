import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const movements = createAsyncThunk(
  'dashboard/fetchAll',
  async () => {
    const { data } = await axios.get('http://localhost:8081/api/v1/operation/all');
    return data;
  }
);

export const issueByIdConsult = createAsyncThunk(
  'dashboard/fetchByIdConsult',
  async () => {
    const { data } = await axios.get(`http://localhost:8081/api/v1/operation?name=finAll`)
    return data;
  }
);


export const issueByIdInsert = createAsyncThunk(
  'dashboard/fetchByIdInsert',
  async () => {
    const { data } = await axios.get(`http://localhost:8081/api/v1/operation?name=insert`)
    return data;
  }
);


export const issueByIdOpen = createAsyncThunk(
  'dashboard/fetchByIdOpen',
  async () => {
    const { data } = await axios.get(`http://localhost:8081/api/v1/operation?name=open`)
    return data;
  }
);


export const issueByIdClosed = createAsyncThunk(
  'dashboard/fetchByIdClosed',
  async () => {
    const { data } = await axios.get(`http://localhost:8081/api/v1/operation?name=closed`)
    return data;
  }
);

