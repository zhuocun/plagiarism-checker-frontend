import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface DatasetState {
    loading: boolean;
    error: string | null;
    dbList: IDataset[] | null;
}

const initialState: DatasetState = {
    loading: true,
    error: null,
    dbList: null
};

export const createDb = createAsyncThunk(
    "db/createDb",
    async (parameters: {
        jwtToken: string | null,
        assignmentId: string | undefined
        datasetName: string | undefined,
        fileType: string;
    }) => {
        const axiosResponse = await axios.post(
            `https://sc-plagiarism-checker.herokuapp.com/dataset/${parameters.assignmentId}`,
            {
                datasetName: parameters.datasetName,
                fileType: parameters.fileType
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
export const getDbList = createAsyncThunk(
    "dbList/getDbList",
    async (parameters: {
        jwtToken: string | null, assignmentId: string | undefined
    }) => {
         
        const axiosResponse = await axios.get(
            `https://sc-plagiarism-checker.herokuapp.com/dataset/${parameters.assignmentId}`,
            {
                headers: {
                    Authorization: `Bearer ${parameters.jwtToken}`
                }
            }
        );
        return axiosResponse.data;
    }
);

export const selectDatasets = createAsyncThunk(
    "db/selectDatasets",
    async (parameters: { jwtToken: string | null, datasets: string[], assignmentId: string | undefined }) => {
        const axiosResponse = await axios.patch(
            `https://sc-plagiarism-checker.herokuapp.com/assignment/dataset/${parameters.assignmentId}`,
            {
                setDatasets: parameters.datasets
            }, {
                headers:
                    {
                        Authorization: `Bearer ${parameters.jwtToken}`
                    }
            }
        );
        return axiosResponse.data;
    }
);
export const deleteDb = createAsyncThunk(
    "db/deleteDb",
    async (parameters: { jwtToken: string | null, datasetId: string | null }) => {
        const axiosResponse = await axios.delete(
            `https://sc-plagiarism-checker.herokuapp.com/dataset/${parameters.datasetId}`,
            {
                headers: {
                    Authorization: `Bearer ${parameters.jwtToken}`
                }
            }
        );
        return axiosResponse.data;
    }
);

export const dbSlice = createSlice({
    name: "bufferFileList",
    initialState,
    reducers: {},
    extraReducers: {
        [getDbList.pending.type]: (state) => {
            state.loading = true;
        },
        [getDbList.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.dbList = action.payload;
        },
        [getDbList.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

