import {createSlice, createAsyncThunk, PayloadAction,} from "@reduxjs/toolkit";
import axios from "axios";

interface ResultTextState {
    loading: boolean;
    error: string | null;
    resultText: any;
}

const initialState: ResultTextState = {
    loading: true,
    error: null,
    resultText: null,
}

/*
export const getResult = createAsyncThunk(
    "result/getResult",
    async (jwtToken: string) => {
        const axiosResponse = await axios.get(
            `http://localhost:8888//`,
            {
                headers: {
                    Authorization: `bearer ${jwtToken}`,
                },
            }
        );
        return axiosResponse.data;
    }
);
 */


export const getResultText = createAsyncThunk(
    "result/getResultText",
    async () => {
        const axiosResponse = await axios.get(
            `https://sc-plagiarism-checker.herokuapp.com/file/get-one-txt/`
        );
        return axiosResponse.data;
    }
);

export const resultTextSlice = createSlice({
    name: "resultText",
    initialState,
    reducers: {},
    extraReducers: {
        [getResultText.pending.type]: (state) => {
            state.loading = true;
        },
        [getResultText.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.resultText = action.payload;
        },
        [getResultText.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

