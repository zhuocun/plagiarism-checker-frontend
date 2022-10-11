import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface SubjectListState {
    loading: boolean;
    error: string | null;
    subjectList: ISubject[] | null;
}

const initialState: SubjectListState = {
    loading: true,
    error: null,
    subjectList: null
};

export const createSbj = createAsyncThunk(
    "subject/createSbj",
    async (parameters: {
        jwtToken: string | null,
        subjectCode: string,
        subjectName: string,
        teacherEmail: string[]
    }) => {
        await axios.post(
            `https://sc-plagiarism-checker.herokuapp.com/subject/admin`,
            {
                subjectCode: parameters.subjectCode,
                subjectName: parameters.subjectName,
                teachers: parameters.teacherEmail
            },
            {
                headers: {
                    Authorization: `Bearer ${parameters.jwtToken}`
                }
            }
        );
    }
);

export const updateSbj = createAsyncThunk(
    "subject/updateSbj",
    async (parameters: {
        jwtToken: string | null,
        subjectId: string,
        subjectName: string,
        teacherEmail: string[]
    }) => {
        await axios.patch(
            `https://sc-plagiarism-checker.herokuapp.com/subject/admin/${parameters.subjectId}`,
            {
                subjectName: parameters.subjectName,
                teachers: parameters.teacherEmail
            },
            {
                headers: {
                    Authorization: `Bearer ${parameters.jwtToken}`
                }
            }
        );
    }
);

export const getSbjList = createAsyncThunk(
    "subjectList/getSubjectList",
    async (jwtToken: string | null) => {
        const axiosResponse = await axios.get(
            `https://sc-plagiarism-checker.herokuapp.com/subject/`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }
        );
        return axiosResponse.data;
    }
);

export const addStudent = createAsyncThunk(
    "subject/addStudent",
    async (parameters: {
        jwtToken: string | null,
        subjectCode: string | null
    }) => {
        const axiosResponse = await axios.post(
            `https://sc-plagiarism-checker.herokuapp.com/subject/`,
            {
                subjectCode: parameters.subjectCode
            },
            {
                headers: {
                    Authorization: `Bearer ${parameters.jwtToken}`
                }
            }
        );
        return axiosResponse.data;
    }
);

export const getAllSbjList = createAsyncThunk(
    "subjectList/getSubjectList",
    async (jwtToken: string | null) => {
        const axiosResponse = await axios.get(
            `https://sc-plagiarism-checker.herokuapp.com/subject/admin`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }
        );
        return axiosResponse.data;
    }
);

export const deleteSbj = createAsyncThunk(
    "subject/deleteSbj",
    async (parameters: {
        jwtToken: string | null,
        subjectId: string | null
    }) => {
        const axiosResponse = await axios.delete(
            `https://sc-plagiarism-checker.herokuapp.com/subject/admin/${parameters.subjectId}`,
            {
                headers: {
                    Authorization: `Bearer ${parameters.jwtToken}`
                }
            }
        );
        return axiosResponse.data;
    }
);

export const subjectListSlice = createSlice({
    name: "subjectList",
    initialState,
    reducers: {},
    extraReducers: {
        [getSbjList.pending.type]: (state) => {
            state.loading = true;
        },
        [getSbjList.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.subjectList = action.payload;
        },
        [getSbjList.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        }
    }
});
