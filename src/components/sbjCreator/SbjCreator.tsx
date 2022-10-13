import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Form, Input, Row, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useState } from "react";
import { createSbj, getAllSbjList } from "../../redux/subject/slice";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";

const SbjCreator: React.FC = () => {
    const dispatch = useReduxDispatch();
    const userType = useReduxSelector((s) => s.authentication.userType);
    const jwtToken = useReduxSelector((state) => state.authentication.jwtToken);
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
            const result = await form.validateFields();
            setVisible(false);
            const subjectCode = result["subjectCode"];
            const subjectName = result["subjectName"];
            const teacherEmail: string[] = [];
            teacherEmail.push(result["teacherEmail"]);
            dispatch(
                createSbj({ jwtToken, subjectCode, subjectName, teacherEmail })
            );
            if (jwtToken) {
                setTimeout(() => {
                    dispatch(getAllSbjList(jwtToken));
                }, 1500);
            }
        } catch (error) {
            return error;
        }
    };

    if (userType === "admin") {
        return (
            <>
                <Button
                    type="primary"
                    onClick={showDrawer}
                    icon={<PlusOutlined />}
                >
                    New Subject
                </Button>
                <Drawer
                    title="Create a new subject"
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
                                Submit
                            </Button>
                        </Space>
                    }
                >
                    <Form layout="vertical" form={form}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="subjectCode"
                                    label="Subject Code"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please enter the subject code"
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
                            <Col span={12}>
                                <Form.Item
                                    name="subjectName"
                                    label="Subject Name"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please enter the subject name"
                                        }
                                    ]}
                                >
                                    <Input
                                        style={{
                                            width: "100%"
                                        }}
                                        placeholder="Subject Name"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="teacherEmail"
                                    label="Teacher's Email"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input teacher's email"
                                        },
                                        {
                                            type: "email",
                                            message:
                                                "it is not a valid email address"
                                        }
                                    ]}
                                >
                                    <Input
                                        style={{
                                            width: "100%"
                                        }}
                                        placeholder="Teacher's Email"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        {/* <Row gutter={16}>
            <Col span={12}>
              <FormItem
                name="Due Date"
                label="Due Date"
                rules={[
                  {
                    required: true,
                    message: "Please pick due date for the assignment",
                  },
                ]}
              >
                <DatePicker style={{width: "100%"}} />
              </FormItem>
            </Col>
          </Row> */}
                    </Form>
                </Drawer>
            </>
        );
    } else {
        return <></>;
    }
};

export default SbjCreator;
