import { UploadOutlined } from "@ant-design/icons";
import { Button, Space, Upload } from "antd";
import React from "react";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { HttpRequestHeader } from "antd/es/upload/interface";
import { getBufferFileList } from "../../redux/bufferFileList/slice";

export const UploadBox: React.FC<{
    assignmentId: string | undefined,
    fileType: string
}> = ({ assignmentId, fileType }) => {
    const jwtToken = useReduxSelector((s) => s.authentication.jwtToken);
    const userType = useReduxSelector((s) => s.authentication.userType);
    const dispatch = useReduxDispatch();
    const headers: HttpRequestHeader = {
        Authorization: jwtToken ? `Bearer ${jwtToken}` : ""
    };
    const data = {
        fileType: fileType.slice(1)
    };
    const onUpload = () => {
        setTimeout(() => {
            dispatch(getBufferFileList({ jwtToken, assignmentId }));
        }, 1900);
    };
    return (
        <Space
            style={{
                width: "20%",
                bottom: 50,
                right: 0
            }}
            size={"large"}
        >
            <Upload
                data={data}
                action={`https://sc-plagiarism-checker.herokuapp.com/buffer/${assignmentId}`}
                headers={headers}
                showUploadList={false}
                listType="text"
                method={"POST"}
                accept={fileType}
                onChange={onUpload}
                multiple={userType !== "student"}
            >
                <Button type={"primary"} icon={<UploadOutlined />}>
                    Upload
                </Button>
            </Upload>
        </Space>
    );
};
