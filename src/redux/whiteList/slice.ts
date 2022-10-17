import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface whiteListSlice {
    getLoading: boolean,
    addLoading: boolean
    whiteList: {
        _id: string,
        email: string,
        __v: number
    }[] | null
    addError: string | null
    getError: string | null
}

const initialState: whiteListSlice = {
    getLoading: false,
    addLoading: false,
    whiteList: null,
    addError: null,
    getError: null
}

export const addWhiteList = createAsyncThunk(
    'whiteList/addWhiteList',
    async (parameters:{
        jwtToken: string,
        email: string
    }) => {
        const response = await  axios.post(
            'https://sc-plagiarism-checker.herokuapp.com/admin/permitTeacherRegistration',
            {
                email: parameters.email
            },
            {
                headers: {
                    Authorization: `Bearer ${parameters.jwtToken}`
                }
            }
        )
        return response
    }
)

export const getWhiteList = createAsyncThunk(
    'whiteList/getWhiteList',
    async (jwtToken:string) => {
            const response = await  axios.get(
                'https://sc-plagiarism-checker.herokuapp.com/admin/getAllPermission',
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                }
            )
            return response.data
    }
)

export const whiteListSlice = createSlice({
    name: "whiteList",
    initialState,
    reducers: {},
    extraReducers: {
        [addWhiteList.pending.type]: (s) => {
            s.addLoading = true
            s.addError = null
        },
        [addWhiteList.rejected.type]: (s, a) => {
            s.addLoading = false
            s.addError = a.error
        },
        [addWhiteList.fulfilled.type]: (s) => {
            s.addLoading = false
        },
        [getWhiteList.pending.type]: (s) => {
            s.getLoading = true
            s.getError = null
        },
        [getWhiteList.fulfilled.type]: (s, a) => {
            s.getLoading = false
            s.whiteList = a.payload
        },
        [getWhiteList.rejected.type]: (s, a) => {
            s.getLoading = false
            s.getError = a.error
        }
    }
})
