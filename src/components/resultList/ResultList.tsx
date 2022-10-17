import React from "react";
import { Skeleton, Table, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import SbjUpdateButton from "../sbjUpdateButton/SbjUpdateButton";
import SbjDelButton from "../sbjDelButton/SbjDelButton";
import { Link,} from "react-router-dom";

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
    title: "Submitter",
    dataIndex: "username",
    key: "username"
  },


  {
    title: "File Name",
    dataIndex: "fileName",
    key: "fileName"
  },
  {
    title: "Similarity",
    dataIndex: "similarity",
    key: "similarity"
  },
  {
    title: "Submit Time",
    dataIndex: "when",
    key: "submitTime"
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
        <Space size="middle">
          <Link to={`/result/detail/?asID=${record.assignmentId._id}&resultId=${record._id}`} >Enter</Link>
        </Space>
    )
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
    resultList.map((r, index) => ({ key: index, ...r, assignmentName: r.assignmentId.assignmentName, username: r.submitter.username})) : [];

  return (
      <div>
        <Skeleton loading={loading} active>
          <Table<ResultInfo>
              columns={columns}
              dataSource={resultData}
              showHeader={true}
              size="small"
              bordered={false}
          />
        </Skeleton>
      </div>

  );
};
