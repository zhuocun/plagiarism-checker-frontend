import React, { useEffect } from "react";
import { UserList } from "../../components";
import { getUserList } from "../../redux/user/slice";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { Spin } from "antd";

export const User = () => {
    const loading = useReduxSelector((s) => s.userList.loading);
    const userList = useReduxSelector((s) => s.userList.userList);
    const jwtToken = useReduxSelector((state) => state.authentication.jwtToken);
    const dispatch = useReduxDispatch();

    useEffect(() => {
        if (jwtToken) {
            dispatch(getUserList(jwtToken));
        }
    }, []);

    if (loading) {
        return (
            <Spin
                size="large"
                style={{
                    marginTop: 200,
                    marginBottom: 200,
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "100%"
                }}
            />
        );
    }

    return (
        <div>
            <UserList loading={loading} userList={userList} />
        </div>
    );
};
