import React from "react";
import { Skeleton, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import UserUpdateButton from "../../components/userUpdateButton/UserUpdateButton";

interface UserData extends IUser {
    key: number;
}

interface PropsType {
    loading: boolean,
    userList: IUser[] | null
}

export const UserList: React.FC<PropsType> = ({
                                                  loading,
                                                  userList
                                              }) => {
    const columns: ColumnsType<UserData> = [
        {
            title: "User Name",
            dataIndex: "username",
            key: "userName"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role"
        },
        {
            title: "ID",
            dataIndex: "_id",
            key: "_id"
        },
        {
            title: "Account Status",
            dataIndex: "accountStatus",
            key: "accountStatus"
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <UserUpdateButton
                        userName={record.username}
                        role={record.role}
                        accountStatus={record.accountStatus}
                        userEmail={record.email}
                    />
                </Space>
            )
        }
    ];

    const Data: UserData[] = userList ?
        userList.map((s, index) => ({
            key: index,
            ...s
        })) : [];

    return (
        <Skeleton loading={loading} active>
            <Table<UserData>
                columns={columns}
                dataSource={Data}
                showHeader={true}
                size="small"
                bordered={false}
            />
        </Skeleton>
    );
};
