import React from "react";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { deleteSbj, getAllSbjList } from "../../redux/subject/slice";
import { Button } from "antd";

const SbjDelButton: React.FC<{ subjectId: string }> = ({ subjectId }) => {
    const jwtToken = useReduxSelector(s => s.authentication.jwtToken);
    const userType = useReduxSelector(s => s.authentication.userType);
    const dispatch = useReduxDispatch();
    const onDelete = () => {
        dispatch(deleteSbj({ jwtToken, subjectId }));
        setTimeout(() => {
            dispatch(getAllSbjList(jwtToken));
        }, 1500);
    };
    if (userType === "admin") {
        return (
            <Button danger type="dashed" onClick={onDelete}>Delete</Button>
        );
    } else {
        return <></>;
    }
};

export default SbjDelButton;
