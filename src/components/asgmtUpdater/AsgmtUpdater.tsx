import {
    Button,
    Col, DatePicker,
    Drawer,
    Form,
    Input,
    Row,
    Space
} from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useState } from "react";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { createAsgmt, getAsgmtList, updateAsgmt } from "../../redux/asgmt/slice";

const AsgmtUpdater: React.FC<{
    subjectId: string | undefined,
    assignmentId: string | undefined,
    assignmentName: string,
    dueDate: string,
    maxCheckingTimes: number,
    threshold: number
}> = ({
          subjectId,
          assignmentId,
          assignmentName,
          dueDate,
          maxCheckingTimes,
          threshold
      }) => {
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
            const assignmentName = result["Assignment Name"];
            const dueDate = result["Due Date"];
            const maxCheckTimes = result["Max checking times"];
            const threshold = result["Threshold"];
            dispatch(updateAsgmt({ jwtToken, assignmentId, assignmentName, dueDate, maxCheckTimes, threshold }));
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
                <Button type="primary" onClick={showDrawer}>
                    Update
                </Button>
                <Drawer
                    title="Update the assignment"
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
                                Update
                            </Button>
                        </Space>
                    }

                >
                    <Form layout="vertical" form={form}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="Assignment Name"
                                    label="Assignment Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter assignment name"
                                        }
                                    ]}
                                >
                                    <Input placeholder={assignmentName} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="Due Date"
                                    label="Due Date"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please pick due date"
                                        }
                                    ]}
                                >
                                    <DatePicker style={{ width: "100%" }} placeholder={dueDate} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="Max checking times"
                                    label="Max checking times"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input the max checking times"
                                        }
                                    ]}
                                >
                                    <Input
                                        style={{
                                            width: "100%"
                                        }}
                                        placeholder={maxCheckingTimes.toString()}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="Threshold"
                                    label="Threshold"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input the threshold"
                                        }
                                    ]}
                                >
                                    <Input
                                        style={{
                                            width: "100%"
                                        }}
                                        placeholder={threshold.toString()}
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

export default AsgmtUpdater;
