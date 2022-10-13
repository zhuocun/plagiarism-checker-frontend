import React from "react";
import { Skeleton, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import BufferFileDelButton from "../bufferFileDelButton/BufferFileDelButton";

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
    const columns: ColumnsType<bufferFileItem> = [
        {
            title: "File Name",
            dataIndex: "fileName",
            key: "fileName"
        },
        {
            title: "Uploader",
            dataIndex: "userName",
            key: "userName"
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <BufferFileDelButton
                        assignmentId={assignmentId}
                        fileId={record._id}
                    />
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
