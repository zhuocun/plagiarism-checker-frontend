import React, { useEffect, useState } from "react";
import { BackImg, Watermark } from "../../components";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import type { NotificationPlacement } from "antd/es/notification";
import styles from './PasswordReset.module.css'
import axios, { Axios, AxiosError } from "axios";

export const PasswordReset: React.FC = () => {
  const [query, setquery] = useSearchParams()
  const [loading, setLoading] = useState(false)
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

  const onFinish = async () => {
    setLoading(true)
    const password = form.getFieldValue('password')
    const token = query.get('token')
    try {
      const response = await axios.post("https://sc-plagiarism-checker.herokuapp.com/user/resetPassword",
        {
          password
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      openNotification("your password has been reset","top")
      setLoading(false)
    } catch (e:any) {
      openNotification(e.response.data.msg,"top")
      setLoading(false)
    }
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
          label="New Password"
          name="password"
          style={{ marginTop: 70 }}

          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password className={styles["input-box"]} />
        </Form.Item>
        <Form.Item
          name="Confirm New Password"
          label="Confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!"

            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("The two passwords that you entered do not match!"));
              }
            })

          ]}
        >
          <Input.Password className={styles["input-box"]} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Reset
          </Button>

        </Form.Item>
        <div style={{ marginLeft: 33 }}>
          <Link to="/register" style={{ marginLeft: "10px", display: "block" }}>Back to Register Page</Link>
          <Link to="/login" style={{ marginLeft: "10px", display: "block" }}>Back to Login Page</Link>
        </div>

        <Watermark top="25%" left="60%" />

      </Form>
    </div>
  )
}
