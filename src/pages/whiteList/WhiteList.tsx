import React, { useEffect, useState } from 'react'
import {Button, Form, Input, Skeleton, Spin, Table, Typography, notification } from 'antd'
import styles from "../register/RegisterPage.module.css";
import {useReduxDispatch, useReduxSelector} from "../../redux/hooks";
import {getWhiteList, addWhiteList} from "../../redux/whiteList/slice";
import {useForm} from 'antd/lib/form/Form';
import type { NotificationPlacement } from "antd/es/notification";

export const WhiteList: React.FC = () => {
    const {Title} = Typography

    const dispatch = useReduxDispatch();
    const [form] = useForm();

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

    const error = useReduxSelector((s) => s.whiteList.getError)
    const addLoading = useReduxSelector((s) => s.whiteList.addLoading)
    const getLoading = useReduxSelector((s) => s.whiteList.getLoading)
    const jwtToken = useReduxSelector((state) => state.authentication.jwtToken);
    const whiteListData = useReduxSelector((s) => s.whiteList.whiteList)
    const [resultData, setResultData] = useState<{email:string, key:string}[]>([]);



    useEffect( ()=> {
        if (whiteListData) {
            const newData = whiteListData.map((i) => {
                return {email: i.email, key: i._id}
            })
            setResultData(newData)
        }
    }, [whiteListData]);


    const onClick = async () => {
            await form.validateFields()
            const email = form.getFieldValue('email')

            if (jwtToken) {
                dispatch(addWhiteList({jwtToken, email}))

                if (error) {
                    openNotification("Email already permitted", "top");
                    return;
                }
                setTimeout(()=> {
                    dispatch(getWhiteList(jwtToken))
                },500)

            }
    }

    const columns = [
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        }
    ]

    return (
        <div>
            <Title level={3}>Whitelist the teacher's email :</Title>
            <Form style={{position: "relative", left: "20vw"}} form={form}>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {required: true, message: "Please input email!"},
                        {type: "email", message: "it is not a valid email address"}
                    ]}
                    style={{marginTop: "42px"}}

                >
                    <Input className={styles["input-box"]}/>
                </Form.Item>

                <Form.Item style={{position: "absolute", top: "0", left: "400px"}}>
                    <Button type="primary" htmlType="submit" onClick={onClick}>
                        Add
                    </Button>
                    <Spin style={{marginLeft: "30px"}} spinning={addLoading}/>
                </Form.Item>

                <Skeleton active loading={getLoading}  >
                    <Table
                        style={{width:"15vw"}}
                        columns={columns}
                        dataSource={resultData}
                        showHeader={true}
                        size="small"
                        bordered={false}
                    />
                </Skeleton>
            </Form>
        </div>
    )
}
