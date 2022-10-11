import React from "react";
import { Button, Skeleton, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { deleteBufferFile, getBufferFileList } from "../../redux/bufferFileList/slice";

interface bufferFileItem extends IBufferFile {
    key: number;
    userName: string;
}

interface PropsType {
    loading: boolean;
    bufferFileList: IBufferFile[] | null;
    assignmentId: string | undefined;
}

export const BufferFileList: React.FC<PropsType> = ({
                                                        loading,
                                                        bufferFileList,
                                                        assignmentId
                                                    }) => {

    const dispatch = useReduxDispatch();
    const jwtToken = useReduxSelector(s => s.authentication.jwtToken);
    const onDelete = (fileId: string) => {
        dispatch(deleteBufferFile({ jwtToken, fileId }));
        setTimeout(() => {
            dispatch(getBufferFileList({ jwtToken, assignmentId }));
        }, 1200);

    };

    const columns: ColumnsType<bufferFileItem> = [
        {
            title: "User Name",
            dataIndex: "userName",
            key: "userName"
        },
        {
            title: "File Name",
            dataIndex: "fileName",
            key: "fileName"
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button danger type={"dashed"} onClick={() => onDelete(record._id)}>Delete</Button>
                </Space>
            )
        }
    ];

    const bufferFileData: bufferFileItem[] = bufferFileList
        ? (bufferFileList.map((b, index) => ({
            key: index,
            userName: b.user.username,
            ...b
        }))) : [];

    return (
        <Skeleton loading={loading} active>
            <Table<bufferFileItem>
                columns={columns}
                dataSource={bufferFileData}
                showHeader={true}
                size="small"
                bordered={false}
            />
        </Skeleton>
    );
};
