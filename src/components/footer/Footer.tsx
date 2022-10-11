import React from "react"
import styles from "./Footer.module.css"
import {Layout} from "antd";

const {Footer: PageFooter} = Layout;

export const Footer = () => {
    return (
        <PageFooter className={styles.footer}>
            Plagiarism Checker ©2022 Created by Team SC-Quokka
        </PageFooter>
    );
};
