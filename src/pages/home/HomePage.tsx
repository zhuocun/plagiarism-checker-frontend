import { Layout } from "antd";
import React, { useEffect } from "react";
import antdStyle from "../../App.css";
import styles from "./HomePage.module.css";
import { Header, Footer, Content } from "../../components";
import { useNavigate } from "react-router-dom";
import { useReduxSelector } from "../../redux/hooks";

export const HomePage = () => {
    const jwtToken = useReduxSelector(s => s.authentication.jwtToken);
    const navigate = useNavigate();
    //const location = useLocation();
    //const title = location.pathname.substring(location.pathname.lastIndexOf("/") + 1, location.pathname.length);
    useEffect(() => {
        if (jwtToken !== null) {
            navigate("/subject");
        } else {
            navigate("/login")
        }
    }, []);

    return (
        <Layout className={styles.layout}>
            <Layout className={antdStyle["site-layout"]}>
                <Header />
                <Content />
                <Footer />
            </Layout>
        </Layout>
    );


};


