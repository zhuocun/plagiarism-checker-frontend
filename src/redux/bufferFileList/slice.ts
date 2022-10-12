import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface BufferFileListState {
    loading: boolean;
    error: string | null;
    bufferFileList: IBufferFile[] | null;
}

const initialState: BufferFileListState = {
    loading: true,
    error: null,
    bufferFileList: null
};

export const getBufferFileList = createAsyncThunk(
    "bufferFileList/getBufferFileList",
    async (parameters: {
        jwtToken: string | null, assignmentId: string | undefined
    }) => {
        const axiosResponse = await axios.get(
            `https://sc-plagiarism-checker.herokuapp.com/buffer/${parameters.assignmentId}`,
            {
                headers: {
                    Authorization: `Bearer ${parameters.jwtToken}`
                }
            }
        );
        return axiosResponse.data;
    }
);

export const deleteBufferFile = createAsyncThunk(
    "bufferFileList/deleteBufferFile",
    async (parameters: {
        jwtToken: string | null, fileId: string | null
    }) => {
        const axiosResponse = await axios.delete(
            `https://sc-plagiarism-checker.herokuapp.com/buffer/${parameters.fileId}`,
            {
                headers: {
                    Authorization: `Bearer ${parameters.jwtToken}`
                }
            }
        );
        return axiosResponse.data;
    }
);

export const bufferFileListSlice = createSlice({
    name: "bufferFileList",
    initialState,
    reducers: {},
    extraReducers: {
        [getBufferFileList.pending.type]: (state) => {
            state.loading = true;
        },
        [getBufferFileList.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.bufferFileList = action.payload;
        },
        [getBufferFileList.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        }
    }
});

