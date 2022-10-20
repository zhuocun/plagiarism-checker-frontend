import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { deleteAsgmt, getAsgmtList } from "../../redux/asgmt/slice";
import { Button } from "antd";
import React from "react";

const AsgmtDelButton: React.FC<{
    subjectId: string | undefined,
    assignmentId: string
}> = ({ subjectId, assignmentId }) => {
    const userType = useReduxSelector((s) => s.authentication.userType);
    const jwtToken = useReduxSelector((s) => s.authentication.jwtToken);
    const dispatch = useReduxDispatch();
    const onDelete = (subjectId: string | undefined, assignmentId: string) => {
        dispatch(deleteAsgmt({ jwtToken, assignmentId })).then(() =>
            dispatch(getAsgmtList({ jwtToken, subjectId }))
        );
    };

    if (userType === "student") {
        return null;
    } else {
        return (
            <Button
                danger
                type={"dashed"}
                onClick={() => onDelete(subjectId, assignmentId)}
            >
                Delete
            </Button>
        );
    }
};

export default AsgmtDelButton;
