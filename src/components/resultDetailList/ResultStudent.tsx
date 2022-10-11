import React from "react";
import {Skeleton, Table} from "antd";
import type {ColumnsType} from 'antd/es/table';

interface Result {
    fileName: string,
    similarity: string,
    PorF: "fail" | "pass"
}

const columns: ColumnsType<Result> = [
    {
        title: "FileName",
        dataIndex: "fileName",
        key: "fileName",
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
    resultDetail: any;
}

export const ResultStudent: React.FC<PropsType> = ({
                                                          resultDetail,
                                                      }) => {

    const result: Result = resultDetail.file ? {
        fileName: resultDetail.file,
        similarity: resultDetail.similarity,
        PorF: resultDetail.PorF
    } : {
        fileName: "No File",
        similarity: "-",
        PorF: "-"
    };

    return (
        <Skeleton loading={false} active>
            <Table<Result>
                columns={columns}
                dataSource={[result]}
                showHeader={true}
                size="small"
                bordered={false}
            />
        </Skeleton>
    );
}