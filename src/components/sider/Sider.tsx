import React, {useEffect, useState} from "react";
import {Menu, Layout} from "antd";
import styles from "./Sider.module.css";
import {BarChartOutlined, ExperimentOutlined, UserDeleteOutlined} from "@ant-design/icons";
import {useLocation, useNavigate} from "react-router-dom";
import {ReduxDispatch} from "../../redux/store";
import {useDispatch} from "react-redux";
import {authenticationSlice} from "../../redux/auth/slice";

const {Sider: PageSider} = Layout;

const getItem = (label: string, key: string, icon?: JSX.Element) => {
    return {
        label,
        key,
        icon
    };
};

const items = [
    getItem("Subject", "subject", <ExperimentOutlined/>),
    getItem("Result", "result", <BarChartOutlined/>),
    getItem("Logout", "logout", <UserDeleteOutlined/>)
];

export const Sider = () => {

    const dispatch = useDispatch<ReduxDispatch>();

    const [selectedKeys, setSelectedKeys] = useState([""]);
    const navigate = useNavigate();
    const clickMenu = ({key}: any) => {
        if (key === "logout") {
            dispatch(authenticationSlice.actions.logout());
            navigate("/login");
        } else {
            navigate(`${key}`, {replace: true});
        }
    };

    const location = useLocation();
    const path = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
    useEffect(() => {
        setSelectedKeys([path]);
    }, [path]);

    return (
        <PageSider width={200} theme={"light"}>
            <Menu theme="light"
                  defaultSelectedKeys={["1"]}
                  mode="inline"
                  items={items}
                  className={styles["sider-menu"]}
                  selectedKeys={selectedKeys}
                  onClick={clickMenu}
            />
        </PageSider>
    );
};
