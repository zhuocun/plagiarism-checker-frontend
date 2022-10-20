import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ResultDetail {
    detailLoading: boolean,
    detailError: string | null,
    resultDetail: IResultDetail | null
    setLoading: boolean,
    setError: string | null
    setResponse: string | null
}

const initialState: ResultDetail = {
    detailLoading: false,
    detailError: null,
    resultDetail: null,
    setError: null,
    setLoading: false,
    setResponse: null
};

export const getResultDetail = createAsyncThunk(
    "resultDetail/getResultDetail",
    async (parameters: {
        jwtToken: string,
        resultId: string
    }) => {
        const response = await axios.get(
            `https://sc-plagiarism-checker.herokuapp.com/result/${parameters.resultId}`,
            {
                headers: {
                    Authorization: `Bearer ${parameters.jwtToken}`
                }
            }
        );
        return response.data;
    }
);

export const setResult = createAsyncThunk(
    "resultDetail/setResult",
    async (parameters: {
        jwtToken: string,
        datasetId: string
        resultId: string,
        pof: "passed" | "failed"
    }) => {
        const response = await axios.post(
            "https://sc-plagiarism-checker.herokuapp.com/result/dataset",
            {
                results: [parameters.resultId],
                datasetId: parameters.datasetId,
                grade: parameters.pof
            },
            {
                headers: {
                    Authorization: `Bearer ${parameters.jwtToken}`
                }
            }
        );
        return response.status;
    }
);

export const resultDetailSlice = createSlice({
    name: "resultDetail",
    initialState,
    reducers: {},
    extraReducers: {
        [getResultDetail.pending.type]: (s) => {
            s.detailLoading = true;
            s.detailError = null;
        },
        [getResultDetail.fulfilled.type]: (s, a) => {
            s.detailLoading = false;
            s.resultDetail = a.payload;
        },
        [getResultDetail.rejected.type]: (s, a) => {
            s.detailLoading = false;
            s.detailError = a.error;
        },
        [setResult.pending.type]: (s) => {
            s.setLoading = true;
            s.setError = null;
            s.setResponse = "200";
        },
        [setResult.fulfilled.type]: (s, a) => {
            s.setLoading = false;
            s.setResponse = a.payload;
        },
        [setResult.rejected.type]: (s, a) => {
            s.setError = a.error;
            s.setLoading = false;
            s.setResponse = "failed";
        }
    }
});
