import React from "react";
import {Skeleton, Table} from "antd";
import type {ColumnsType} from 'antd/es/table';


interface ResultItem {
    similarTo: string,
    authorName: string,
    authorEmail: string
}

const columns: ColumnsType<ResultItem> = [
    {
        title: "Similar To",
        dataIndex: "similarTo",
        key: "similarTo",
    },
    {
        title: "Author Name",
        dataIndex: "authorName",
        key: "authorName"
    },
    {
        title: "Author Email",
        dataIndex: "authorEmail",
        key: "authorEmail",
    },
];

interface PropsType {
    loading: boolean;
    resultDetail: IResultDetail | null;
}

export const ResultDetailList: React.FC<PropsType> = ({
                                                          loading,
                                                          resultDetail,
                                                      }) => {



        const data = resultDetail? resultDetail.source.map((item, index) => ({
            similarTo: item.similarTo,
            authorName: item.author.username,
            authorEmail: item.author.email,
            key: index
        })) : []

    return (
        <div>
            <Skeleton loading={loading} active>
                <Table<ResultItem>
                    columns={columns}
                    dataSource={data}
                    showHeader={true}
                    size="small"
                    bordered={false}
                    pagination={false}
                />
            </Skeleton>

        </div>

    );
}
