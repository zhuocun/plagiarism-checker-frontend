import { Button, Col, Drawer, Form, Input, Row, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useState } from "react";
import { getAllSbjList, updateSbj } from "../../redux/subject/slice";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";

const SbjUpdateButton: React.FC<{
    subjectId: string,
    subjectName: string,
    email: string
}> = ({ subjectId, email, subjectName }) => {
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
            const subjectName = result["subjectName"];
            const teacherEmail: string[] = [];
            teacherEmail.push(result["teacherEmail"]);
            dispatch(
                updateSbj({ jwtToken, subjectId, subjectName, teacherEmail })
            ).then(() => dispatch(getAllSbjList(jwtToken)));
        } catch (error) {
            return error;
        }
    };

    if (userType === "admin") {
        return (
            <>
                <Button type="primary" onClick={showDrawer}>
                    Update
                </Button>
                <Drawer
                    title="Update the subject"
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
                                Update
                            </Button>
                        </Space>
                    }
                >
                    <Form
                        layout="vertical"
                        form={form}
                        initialValues={{
                            subjectName: subjectName,
                            teacherEmail: email
                        }}
                    >
                        <Row gutter={16}>
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
                                    />
                                </Form.Item>
                            </Col>
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

export default SbjUpdateButton;
