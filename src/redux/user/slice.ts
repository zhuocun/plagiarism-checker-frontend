import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserListState {
  loading: boolean;
  error: string | null;
  userList: IUser[] | null;
}

const initialState: UserListState = {
  loading: false,
  error: "",
  userList: []
}

export const getUserList = createAsyncThunk("userList/getUserList", async (jwtToken: string) => {
  const axiosResponse = await axios.get(
    `https://sc-plagiarism-checker.herokuapp.com/admin/getAllUser`,
    {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    }
  );
  return axiosResponse.data
})

export const updateUser = createAsyncThunk("userList/updateUser", 
async (parameters: {
  jwtToken: string,
  userEmail: string,
  update: any
}) => {
  const axiosResponse = await axios.post(
    `https://sc-plagiarism-checker.herokuapp.com/admin/updateUserAccount`,
    {
        userEmail: parameters.userEmail,
        update: parameters.update
    },
    {
      headers: {
        Authorization: `Bearer ${parameters.jwtToken}`
      }
    }
  );
})

export const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {},
  extraReducers: {
    [getUserList.pending.type]: (state) => {
      state.loading = true;
    },
    [getUserList.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.userList = action.payload;
    },
    [getUserList.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    }
  }
})