import React, { useEffect } from "react";
import styles from "./AsgmtPage.module.css";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { getAsgmtList } from "../../redux/asgmt/slice";
import { Spin } from "antd";
import { useParams } from "react-router-dom";
import { AsgmtList } from "../../components/asgmtList/AsgmtList";
import AsgmtCreator from "../../components/asgmtCreator/AsgmtCreator";

export const AsgmtPage = () => {
    const { subjectCode } = useParams();
    // useEffect(() => {
    //     PubSub.publish("title", `Assignment`);
    // }, []);

    const jwtToken = useReduxSelector((s) => s.authentication.jwtToken);
    const loading = useReduxSelector((s) => s.assignmentList.loading);
    const assignmentList = useReduxSelector((s) => s.assignmentList.asgmtList);
    const sbjList = useReduxSelector(s => s.subjectList.subjectList);
    let subjectId: string | undefined = undefined;
    if (sbjList) {
        for (const s of sbjList) {
            if (s.subjectCode === subjectCode) {
                subjectId = s._id;
            }
        }
    }
    const dispatch = useReduxDispatch();
    useEffect(() => {
        if (jwtToken) {
            dispatch(getAsgmtList({ jwtToken, subjectId }));
        }
    }, [dispatch, jwtToken]);

    if (loading) {
        return (
            <Spin
                size="large"
                style={{
                    marginTop: 200,
                    marginBottom: 200,
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "100%"
                }}
            />
        );
    }

    return (
        <div className={styles["assign-container"]}>
            <div className={styles["teacherAssignTable-container"]}>
                <AsgmtList subjectCode={subjectCode} subjectId={subjectId} loading={loading} assignmentList={assignmentList} />
                <AsgmtCreator subjectId={subjectId} />
            </div>
        </div>
    );
};
