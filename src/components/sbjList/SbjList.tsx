import React from "react";
import { Skeleton, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import SbjDelButton from "../sbjDelButton/SbjDelButton";
import SbjUpdateButton from "../sbjUpdateButton/SbjUpdateButton";

interface SbjIntro extends ISubject {
    key: number;
    teacherName: string;
}

interface PropsType {
    loading: boolean,
    subjectList: ISubject[] | null
}

export const SbjList: React.FC<PropsType> = ({
                                                 loading,
                                                 subjectList
                                             }) => {
    const columns: ColumnsType<SbjIntro> = [
        {
            title: "Subject Code",
            dataIndex: "subjectCode",
            key: "subjectId"
        },
        {
            title: "Subject Name",
            dataIndex: "subjectName",
            key: "subjectName"
        },
        {
            title: "Teacher",
            dataIndex: "teacherName",
            key: "teacherName"
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`${record.subjectCode}`} replace={true}>Enter</Link>
                    <SbjUpdateButton
                        subjectId={record._id}
                        subjectName={record.subjectName}
                        email={record.teachers[0].email}
                    />
                    <SbjDelButton subjectId={record._id} />
                </Space>
            )
        }
    ];

    const sbjData: SbjIntro[] = subjectList ?
        subjectList.map((s, index) => ({
            key: index,
            ...s,
            teacherName: s.teachers[0]?.username
        })) : [];

    return (
        <Skeleton loading={loading} active>
            <Table<SbjIntro>
                columns={columns}
                dataSource={sbjData}
                showHeader={true}
                size="small"
                bordered={false}
            />
        </Skeleton>
    );
};
