import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { Button } from "antd";
import React from "react";
import {
    deleteBufferFile,
    getBufferFileList
} from "../../redux/bufferFileList/slice";

const BufferFileDelButton: React.FC<{
    assignmentId: string | undefined,
    fileId: string
}> = ({ fileId, assignmentId }) => {
    const userType = useReduxSelector((s) => s.authentication.userType);
    const jwtToken = useReduxSelector((s) => s.authentication.jwtToken);
    const dispatch = useReduxDispatch();
    const onDelete = (fileId: string) => {
        dispatch(deleteBufferFile({ jwtToken, fileId }));
        setTimeout(() => {
            dispatch(getBufferFileList({ jwtToken, assignmentId }));
        }, 1500);
    };

    if (userType === "student") {
        return (
            <Button danger disabled type={"dashed"}>
                Delete
            </Button>
        );
    } else {
        return (
            <Button danger type={"dashed"} onClick={() => onDelete(fileId)}>
                Delete
            </Button>
        );
    }
};

export default BufferFileDelButton;
