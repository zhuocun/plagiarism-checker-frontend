import { Button, Col, Drawer, Form, Input, Row, Space } from "antd";
import React, { useState } from "react";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { useForm } from "antd/lib/form/Form";
import { PlusOutlined } from "@ant-design/icons";
import { addStudent, getSbjList } from "../../redux/subject/slice";

const StudentAdder: React.FC = () => {
    const dispatch = useReduxDispatch();
    const jwtToken = useReduxSelector((s) => s.authentication.jwtToken);
    const [visible, setVisible] = useState(false);
    const [form] = useForm();
    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const onClick = async () => {
        try {
            setVisible(false);
            const result = await form.validateFields();
            const subjectCode = result["Subject Code"];
            dispatch(addStudent({ jwtToken, subjectCode })).then(() =>
                dispatch(getSbjList(jwtToken))
            );
        } catch (error) {
            return error;
        }
    };

    return (
        <>
            <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                Join Subject
            </Button>
            <Drawer
                title="Join a subject"
                width={570}
                onClose={onClose}
                visible={visible}
                bodyStyle={{
                    paddingBottom: 80
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={onClick}
                        >
                            Join
                        </Button>
                    </Space>
                }
            >
                <Form layout="vertical" form={form} onFinish={onClick}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="Subject Code"
                                label="Subject Code"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter subject code"
                                    }
                                ]}
                            >
                                <Input
                                    style={{
                                        width: "100%"
                                    }}
                                    placeholder="Subject Code"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

export default StudentAdder;
