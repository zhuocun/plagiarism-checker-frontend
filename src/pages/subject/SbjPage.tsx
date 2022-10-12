import React, { useEffect } from "react";
import { SbjList } from "../../components";
import { getAllSbjList, getSbjList } from "../../redux/subject/slice";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import SbjCreator from "../../components/sbjCreator/SbjCreator";
import { Spin } from "antd";
import StudentAdder from "../../components/studentAdder/StudentAdder";

export const SbjPage: React.FC = () => {
    const dispatch = useReduxDispatch();
    const userType = useReduxSelector((s) => s.authentication.userType);
    const jwtToken = useReduxSelector((state) => state.authentication.jwtToken);
    const subjectList = useReduxSelector(
        (state) => state.subjectList.subjectList
    );
    const loading = useReduxSelector((s) => s.subjectList.loading);

    useEffect(() => {
        if (jwtToken) {
            if (userType === "admin") {
                dispatch(getAllSbjList(jwtToken));
            } else {
                dispatch(getSbjList(jwtToken));
            }
        }
    }, [jwtToken]);

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
        <div>
            <SbjList loading={loading} subjectList={subjectList} />
            {userType === "student" ? <StudentAdder /> : <SbjCreator />}
        </div>
    );
};
