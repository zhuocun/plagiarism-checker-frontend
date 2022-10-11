import React from "react";
import {Layout} from "antd";
import styles from "./Content.module.css"
import {Outlet} from "react-router-dom";


const {Content: PageContent} = Layout;

export const Content = () => {
    return (
        <PageContent className={styles.content}>
            <Outlet/>
        </PageContent>
    );
};