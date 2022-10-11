import React, { useEffect } from "react";
import styles from "./ResultListPage.module.css";
import { ResultList } from "../../components";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { getResultList } from "../../redux/result/slice";

export const ResultListPage = () => {
    const jwtToken = useReduxSelector((s) => s.authentication.jwtToken) as string;
    const results = useReduxSelector(s => s.result.resultList);
    const loading = useReduxSelector(s => s.result.loading);
    const dispatch = useReduxDispatch();
    useEffect(() => {
        //PubSub.publish("title", "Result");
        dispatch(getResultList(jwtToken));
    }, [jwtToken]);

    return (
        <div className={styles["assign-container"]}>
            <div className={styles["teacherAssignTable-container"]}>
                <ResultList loading={loading} resultList={results} />
            </div>
        </div>
    );
};
