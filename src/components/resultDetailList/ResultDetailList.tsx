import React from "react";
import {Skeleton, Table} from "antd";
import type {ColumnsType} from 'antd/es/table';

interface ResultItem {
    submissionID: number,
    submitter: string,
    File: string,
    uploadTime: string,
    similarity: string,
    PorF: "fail" | "pass"
}

const columns: ColumnsType<ResultItem> = [
    {
        title: "SubmissionID",
        dataIndex: "submissionID",
        key: "submissionID",
    },
    {
        title: "Submitter",
        dataIndex: "submitter",
        key: "submitter"
    },
    {
        title: "File",
        dataIndex: "file",
        key: "file",
    },
    {
        title: "Upload Time",
        dataIndex: "uploadTime",
        key: "uploadTime",
    },
    {
        title: "Similarity",
        dataIndex: "similarity",
        key: "similarity",
    },
    {
        title: "P/F",
        dataIndex: "PorF",
        key: "PorF",
    },
];

interface PropsType {
    loading: boolean;
    resultDetail: any;
}

export const ResultDetailList: React.FC<PropsType> = ({
                                                          loading,
                                                          resultDetail,
                                                      }) => {


    return (
        <Skeleton loading={loading} active>
            <Table<ResultItem>
                columns={columns}
                dataSource={resultDetail}
                showHeader={true}
                size="small"
                bordered={false}
            />
        </Skeleton>
    );
}