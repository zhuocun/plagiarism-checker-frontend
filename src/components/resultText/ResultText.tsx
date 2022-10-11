import React from "react";
import {Skeleton, Table} from "antd";
import type {ColumnsType} from 'antd/es/table';

interface ResultText {
    resultText: string;
}

const columns: ColumnsType<ResultText> = [
    {
        title: "Result Text",
        dataIndex: "resultText",
        key: "resultText",
    }
];

interface PropsType {
    resultText: any;
}

export const ResultText: React.FC<PropsType> = ({
                                                    resultText,
                                                }) => {


    const text: ResultText = resultText ? {
        resultText: resultText
    } : {
        resultText: "No data"
    };

    return (
        <Skeleton loading={false} active>
            <Table<ResultText>
                columns={columns}
                dataSource={[text]}
                showHeader={true}
                size="small"
                bordered={false}
            />
        </Skeleton>
    );
}