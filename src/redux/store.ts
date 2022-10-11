import { assignmentListSlice } from "./asgmt/slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authenticationSlice } from "./auth/slice";
import { resultSlice } from "./result/slice";
import { subjectListSlice } from "./subject/slice";
import { resultTextSlice } from "./resultText/slice";
import { bufferFileListSlice } from "./bufferFileList/slice";
import { dbSlice } from "./dataset/slice";

const persistConfig = {
    key: "root",
    storage,
    whiteList: ["user"]
};

const rootReducer = combineReducers(
    {
        assignmentList: assignmentListSlice.reducer,
        authentication: authenticationSlice.reducer,
        subjectList: subjectListSlice.reducer,
        bufferFileList: bufferFileListSlice.reducer,
        result: resultSlice.reducer,
        resultText: resultTextSlice.reducer,
        db: dbSlice.reducer
    }
);

const persistedReducer = persistReducer(persistConfig, rootReducer);

// reducers are saved in store
const store = configureStore(
    {
        reducer: persistedReducer,
        devTools: true
    }
);

const persistor = persistStore(store);

// state of the store, including everything in redux folder
export type RootState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;

const stores = { store, persistor };
export default stores;
