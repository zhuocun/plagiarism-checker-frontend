import React, { useEffect } from "react";
import { UserList } from "../../components";
import { getUserList } from "../../redux/user/slice";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";

export const UserManagementPage = () => {
    const loading = useReduxSelector((s) => s.userList.loading);
    const userList = useReduxSelector((s) => s.userList.userList);
    const jwtToken = useReduxSelector((state) => state.authentication.jwtToken);
    const dispatch = useReduxDispatch();

    useEffect(() => {
        if (jwtToken) {
            dispatch(getUserList(jwtToken));
        }
    }, []);

    return (
        <div>
            <UserList loading={loading} userList={userList} />
        </div>
    );
};
