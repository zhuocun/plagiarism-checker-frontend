import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface AsgmtState {
    loading: boolean;
    error: string | null;
    asgmtList: IAssignment[] | null;
}

const initialState: AsgmtState = {
    loading: true,
    error: null,
    asgmtList: null
};

export const getAsgmtList = createAsyncThunk(
    "assignmentList/getAssignmentList",
    async (parameters: { jwtToken: string | null, subjectId: string | undefined }) => {
        const axiosResponse = await axios.get(
            `https://sc-plagiarism-checker.herokuapp.com/assignment/${parameters.subjectId}`,
            {
                headers: {
                    Authorization: `Bearer ${parameters.jwtToken}`
                }
            }
        );
        console.log(axiosResponse);
        return axiosResponse.data;
    }
);

export const createAsgmt = createAsyncThunk(
    "asgmt/createAsgmt",
    async (parameters: {
        jwtToken: string | null,
        subjectId: string | undefined,
        assignmentName: string,
        dueDate: string,
        threshold: number,
        maxCheckTimes: number
    }) => {
        await axios.post(`https://sc-plagiarism-checker.herokuapp.com/assignment/${parameters.subjectId}`,
            {
                assignmentName: parameters.assignmentName,
                dueDate: parameters.dueDate,
                threshold: parameters.threshold,
                maxCheckTimes: parameters.maxCheckTimes
            },
            {
                headers: {
                    Authorization: `Bearer ${parameters.jwtToken}`
                }
            }
        );
    }
);

export const updateAsgmt = createAsyncThunk(
    "asgmt/updateAsgmt",
    async (parameters: {
        jwtToken: string | null,
        assignmentId: string | undefined,
        assignmentName: string,
        dueDate: string,
        threshold: number,
        maxCheckTimes: number
    }) => {
        await axios.patch(`https://sc-plagiarism-checker.herokuapp.com/assignment/${parameters.assignmentId}`,
            {
                assignmentName: parameters.assignmentName,
                dueDate: parameters.dueDate,
                threshold: parameters.threshold,
                maxCheckTimes: parameters.maxCheckTimes
            },
            {
                headers: {
                    Authorization: `Bearer ${parameters.jwtToken}`
                }
            }
        );
    }
);

export const deleteAsgmt = createAsyncThunk(
    "asgmt/deleteAsgmt",
    async (parameters: {
        jwtToken: string | null,
        assignmentId: string | undefined
    }) => {
        const axiosResponse = await axios.delete(
            `https://sc-plagiarism-checker.herokuapp.com/assignment/${parameters.assignmentId}`,
            {
                headers: {
                    Authorization: `Bearer ${parameters.jwtToken}`
                }
            }
        );
        return axiosResponse.data;
    }
);

export const assignmentListSlice = createSlice({
    name: "assignmentList",
    initialState,
    reducers: {},
    extraReducers: {
        [getAsgmtList.pending.type]: (state) => {
            state.loading = true;
        },
        [getAsgmtList.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.asgmtList = action.payload;
        },
        [getAsgmtList.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

