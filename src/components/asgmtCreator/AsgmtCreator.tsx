import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useState } from "react";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { createAsgmt, getAsgmtList } from "../../redux/asgmt/slice";

const AsgmtCreator: React.FC<{ subjectId: string | undefined }> = ({
    subjectId
}) => {
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
            const assignmentName = result["assignmentName"];
            const dueDate = result["dueDate"];
            const maxCheckTimes = result["maxCheckingTimes"];
            const threshold = result["threshold"];
            dispatch(
                createAsgmt({
                    jwtToken,
                    subjectId,
                    assignmentName,
                    dueDate,
                    maxCheckTimes,
                    threshold
                })
            );
            if (jwtToken) {
                setTimeout(() => {
                    dispatch(getAsgmtList({ jwtToken, subjectId }));
                }, 1500);
            }
        } catch (error) {
            return error;
        }
    };

    if (userType !== "student") {
        return (
            <>
                <Button
                    type="primary"
                    onClick={showDrawer}
                    icon={<PlusOutlined />}
                >
                    New Assignment
                </Button>
                <Drawer
                    title="Create a new assignment"
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
                                    name="assignmentName"
                                    label="Assignment Name"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please enter the assignment name"
                                        }
                                    ]}
                                >
                                    <Input placeholder="Assignment Name" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="dueDate"
                                    label="Due Date"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please pick due date"
                                        }
                                    ]}
                                >
                                    <DatePicker style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="maxCheckingTimes"
                                    label="Max checking times"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input the max checking times"
                                        }
                                    ]}
                                >
                                    <Input
                                        style={{
                                            width: "100%"
                                        }}
                                        placeholder="Max checking times"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="threshold"
                                    label="Threshold"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input the threshold"
                                        }
                                    ]}
                                >
                                    <Input
                                        style={{
                                            width: "100%"
                                        }}
                                        placeholder="Threshold"
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

export default AsgmtCreator;
