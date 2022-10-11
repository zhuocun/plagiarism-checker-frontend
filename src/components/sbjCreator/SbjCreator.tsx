import { PlusOutlined } from "@ant-design/icons";
import {
    Button,
    Col,
    Drawer,
    Form,
    Input,
    Row,
    Space
} from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useState } from "react";
import { createSbj, getAllSbjList } from "../../redux/subject/slice";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";

const SbjCreator: React.FC = () => {
    const dispatch = useReduxDispatch();
    const userType = useReduxSelector(s => s.authentication.userType);
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
            const subjectCode = result["Subject Code"];
            const subjectName = result["Subject Name"];
            const teacherEmail: string[] = [];
            teacherEmail.push(result["Teacher Email"]);
            dispatch(createSbj({ jwtToken, subjectCode, subjectName, teacherEmail }));
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
                <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
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
                            <Button type="primary" htmlType="submit" onClick={onClick}>
                                Submit
                            </Button>
                        </Space>
                    }

                >
                    <Form layout="vertical" form={form}>
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
                            <Col span={12}>
                                <Form.Item
                                    name="Subject Name"
                                    label="Subject Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter Subject Name"
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
                                    name="Teacher Email"
                                    label="Teacher's Email"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input the Teacher Email"
                                        },
                                        { type: "email", message: "it is not a valid email address" }
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
