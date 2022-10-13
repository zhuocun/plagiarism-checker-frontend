import React, { Dispatch, SetStateAction } from "react";
import { Button, Skeleton, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { deleteDb, getDbList } from "../../redux/dataset/slice";

interface DbItem extends IDataset {
    key: number;
}

interface PropsType {
    loading: boolean;
    asgmtDbList: IDataset[] | null;
    setDatasets: Dispatch<SetStateAction<string[]>>;
    assignmentId: string | undefined;
}

export const DbList: React.FC<PropsType> = ({
                                                loading,
                                                asgmtDbList,
                                                setDatasets,
                                                assignmentId
                                            }) => {
    const jwtToken = useReduxSelector(s => s.authentication.jwtToken);
    const dispatch = useReduxDispatch();
    const onDelete = (datasetId: string) => {
        dispatch(deleteDb({ jwtToken, datasetId }));
        dispatch(getDbList({ jwtToken, assignmentId }));
    };
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DbItem[]) => {
            let datasets: string[] = [];
            if (selectedRows.length) {
                selectedRows.map((r) => (
                    datasets?.push(r._id)
                ));
            }
            setDatasets(datasets);
        },
        getCheckboxProps: (record: DbItem) => ({
            disabled: undefined, // Column configuration not to be checked
            title: record.datasetName
        })
    };

    const columns: ColumnsType<DbItem> = [
        {
            title: "Dataset Name",
            dataIndex: "datasetName",
            key: "datasetName"
        },
        {
            title: "File Type",
            dataIndex: "fileType",
            key: "fileType"
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button type={"dashed"} danger onClick={() => onDelete(record._id)}>Delete</Button>
                </Space>
            )
        }
    ];

    const dbInfo: DbItem[] = asgmtDbList ?
        asgmtDbList.map((d, index) => ({
            key: index,
            ...d
        })) : [];

    return (
        <Skeleton loading={loading} active>
            <Table<DbItem>
                rowSelection={{
                    type: "checkbox",
                    onChange: rowSelection.onChange,
                    getCheckboxProps: rowSelection.getCheckboxProps
                }}
                style={{ width: 400 }}
                columns={columns}
                dataSource={dbInfo}
                showHeader={true}
                size="small"
                bordered={false}
            />
        </Skeleton>
    );
};
