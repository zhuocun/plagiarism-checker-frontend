import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ResultState {
    loading: boolean;
    error: any;
    resultList: IResult[] | null;
}

const initialState: ResultState = {
    loading: false,
    error: null,
    resultList: null
};

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

export const callChecker = createAsyncThunk(
    "check/callChecker",
    async (parameters: {
        jwtToken: string | null,
        assignmentId: string | undefined,
        fileType: string | undefined,
        granularity: string, 
    }) => {
        await axios.post(`https://sc-plagiarism-checker.herokuapp.com/check`,
            {
                assignmentId: parameters.assignmentId,
                fileType: parameters.fileType,
                granularity: parameters.granularity,
            },
            {
                headers: {
                    Authorization: `Bearer ${parameters.jwtToken}`
                }
            }
        );
    }
);

export const getResultList = createAsyncThunk(
    "result/getResultList",
    async (parameters: {
        jwtToken: string | null,
        assigmentID: string
    }) => {
        const axiosResponse = await axios.get(
            `https://sc-plagiarism-checker.herokuapp.com/result/list/${parameters.assigmentID}`,
            {
                headers: {
                    Authorization: `Bearer ${parameters.jwtToken}`
                }
            }
        );
        return axiosResponse.data;
    }
);

export const resultSlice = createSlice({
    name: "result",
    initialState,
    reducers: {},
    extraReducers: {
        [getResultList.pending.type]: (state) => {
            state.loading = true;
        },
        [getResultList.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.resultList = action.payload;
        },
        [getResultList.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

