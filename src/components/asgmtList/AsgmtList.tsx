import React from "react";
import { Skeleton, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import AsgmtDelButton from "../asgmtDelButton/AsgmtDelButton";
import AsgmtUpdateButton from "../asgmtUpdateButton/AsgmtUpdateButton";

interface AsgmtIntro extends IAssignment {
    key: number;
}

interface PropsType {
    loading: boolean;
    assignmentList: IAssignment[] | null;
    subjectId: string | undefined;
    subjectCode: string | undefined;
}

export const AsgmtList: React.FC<PropsType> = ({
                                                   loading,
                                                   assignmentList,
                                                   subjectId,
                                                   subjectCode
                                               }) => {
    const columns: ColumnsType<AsgmtIntro> = [
        {
            title: "Subject Code",
            dataIndex: "subjectCode",
            key: "subjectCode"
        },
        {
            title: "Assignment Name",
            dataIndex: "assignmentName",
            key: "assignmentName"
        },
        {
            title: "Due Date",
            dataIndex: "dueDate",
            key: "dueDate"
        },
        {
            title: "Checking Limit",
            dataIndex: "maxCheckTimes",
            key: "maxCheckTimes"
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`${record.assignmentName}`} replace={true}>Enter</Link>
                    <AsgmtUpdateButton subjectId={subjectId} assignmentId={record._id}
                                       assignmentName={record.assignmentName}
                                       dueDate={record.dueDate} maxCheckingTimes={record.maxCheckTimes}
                                       threshold={record.threshold} />
                    <AsgmtDelButton subjectId={subjectId} assignmentId={record._id} />
                </Space>
            )
        }
    ];

    const asgmtData: AsgmtIntro[] = assignmentList && subjectId
        ? (assignmentList.map((a, index) => ({
            key: index,
            ...a,
            dueDate: a.dueDate?.slice(0, 10),
            subjectCode: subjectCode
        }))) : [];

    return (
        <Skeleton loading={loading} active>
            <Table<AsgmtIntro>
                columns={columns}
                dataSource={asgmtData}
                showHeader={true}
                size="small"
                bordered={false}
            />
        </Skeleton>
    );
};
