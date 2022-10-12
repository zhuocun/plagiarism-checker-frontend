import React, { useEffect, useState } from "react";
import { BackImg, Watermark } from "../../components";
import { Button, Checkbox, Form, Input, notification, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import type { NotificationPlacement } from "antd/es/notification";
import styles from './SendLink.module.css'
import axios from "axios";

export const SendLink: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const [form] = Form.useForm();
  const onFinish = () => {
    console.log("first")
  }

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

  const sendCode = async () => {
    setLoading(true)
    try {

      // const reulst = await form.validateFields(['registeredEmail'])
      const email = form.getFieldValue("registeredEmail")
       
      try {
        const response = await axios.post("https://sc-plagiarism-checker.herokuapp.com/auth/recoverEmail",
          {
            email
          }
        )
        setLoading(false)
        openNotification("reset email has been sent, please check your email","top")
        
      } catch (e:any) {
        openNotification(e.response.data.msg,"top")
        setLoading(false)
      }
    }
    catch (e) {
      setLoading(false)
    }
  }
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
      <BackImg />
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        className={styles["passwordReset-form"]}
        onFinish={onFinish}

        form={form}
      >

        <Form.Item
          label="Enter your registered email"
          name="registeredEmail"
          rules={[{ required: true, message: "Please input your email!" },
          { type: "email", message: "it is not a valid email address" }
          ]}
          style={{ marginTop: "80px" }}
        >
          <Input className={styles["input-box"]} ></Input>
        </Form.Item>


        <Button style={{ position: "absolute", right: 200, top: 80 }} onClick={sendCode} loading={loading}>
          Send Reset Code
        </Button>

        <div style={{ marginLeft: 33 }}>
          <Link to="/register" style={{ marginLeft: "10px", display: "block" }}>Back to Register Page</Link>
          <Link to="/login" style={{ marginLeft: "10px", display: "block" }}>Back to Login Page</Link>
        </div>
        <Watermark top="25%" left="60%" />

      </Form>
    </div>
  )
}