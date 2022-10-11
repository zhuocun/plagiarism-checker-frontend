import React from "react";
import { Skeleton, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface ResultInfo extends IResult {
    key: number;
}

const columns: ColumnsType<ResultInfo> = [
    {
        title: "Assignment Name",
        dataIndex: "assignmentName",
        key: "assignmentName"
    },
    {
        title: "File Name",
        dataIndex: "fileName",
        key: "fileName"
    },

    {
        title: "Submit Time",
        dataIndex: "submitTime",
        key: "submitTime"
    },
    {
        title: "Similarity",
        dataIndex: "similarity",
        key: "similarity"
    }
];

interface PropsType {
    loading: boolean;
    resultList: IResult[] | null;
}

export const ResultList: React.FC<PropsType> = ({
                                                    loading,
                                                    resultList
                                                }) => {

    const resultData: ResultInfo[] = resultList ?
        resultList.map((r, index) => ({ key: index, ...r })) : [];

    return (
        <Skeleton loading={loading} active>
            <Table<ResultInfo>
                columns={columns}
                dataSource={resultData}
                showHeader={true}
                size="small"
                bordered={false}
            />
        </Skeleton>
    );
};
