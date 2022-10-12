import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, notification } from "antd";
import type { NotificationPlacement } from "antd/es/notification";
import { BackImg } from "../../components";
import styles from "./LoginPage.module.css";
import { Watermark } from "../../components";
import React, { useEffect } from "react";
import { login } from "../../redux/auth/slice";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";


export const LoginPage = () => {

    const jwtToken = useReduxSelector((state) => state.authentication.jwtToken);
    const loading = useReduxSelector((state) => state.authentication.loading);
    const error = useReduxSelector((state) => state.authentication.error);
    const dispatch = useReduxDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const openNotification = (description: string, placement: NotificationPlacement) => {
        notification.open(
            {
                message: "Notification",
                placement,
                description,
                duration: 1.2
            }
        );
    };

    useEffect(() => {
        if (jwtToken) {
            navigate("/");
        }
    }, [jwtToken]);

    const onFinish = (values: any) => {
        dispatch(login({
            username: values.username,
            password: values.password
        }));
        if (error)  {
            
            openNotification("Username or Password incorrect", "top");
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div>
            <BackImg />
             
            <Form
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className={styles["login-form"]}
                form={form}
            >
                <Form.Item
                    label="Email"
                    name="username"
                    rules={[{ required: true, message: "Please input your email!" }]}
                    style={{ marginTop: "80px" }}
                >
                    <Input className={styles["input-box"]} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Please input your password!" }]}
                >
                    <Input.Password className={styles["input-box"]} />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                    <Link to="/register" style={{ marginLeft: "10px" }}>Register for an account</Link>
                    <Link to="/reset" style={{ marginLeft: "10px" }}>Forgot Password? </Link>
                </Form.Item>


                <Watermark top="25%" left="60%" />
                 
            </Form>
        </div>
    );
};
