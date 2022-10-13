import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import React, { useState } from "react";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { useForm } from "antd/lib/form/Form";
import { createDb, getDbList } from "../../redux/dataset/slice";
import { PlusOutlined } from "@ant-design/icons";

interface PropsType {
    assignmentId: string | undefined;
}

const DbCreator: React.FC<PropsType> = ({ assignmentId }) => {
    const dispatch = useReduxDispatch();
    const jwtToken = useReduxSelector((s) => s.authentication.jwtToken);
    const [visible, setVisible] = useState(false);
    const [fileType, setFileType] = useState("");
    const [form] = useForm();
    const { Option } = Select;
    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const onSelect = (value: string) => {
        setFileType(value);
    };
    const onClick = async () => {
        try {
            setVisible(false);
            const result = await form.validateFields();
            const datasetName = result["datasetName"];
            dispatch(
                createDb({
                    jwtToken,
                    assignmentId,
                    datasetName,
                    fileType
                })
            );
            if (jwtToken) {
                setTimeout(() => {
                    dispatch(getDbList({ jwtToken, assignmentId }));
                }, 1500);
            }
        } catch (error) {
            return error;
        }
    };

    return (
        <>
            <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                Create
            </Button>
            <Drawer
                title="Create a new dataset"
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
                            Create
                        </Button>
                    </Space>
                }
            >
                <Form layout="vertical" form={form} onFinish={onClick}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="datasetName"
                                label="Dataset Name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter dataset name"
                                    }
                                ]}
                            >
                                <Input
                                    style={{
                                        width: "100%"
                                    }}
                                    placeholder="Dataset Name"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="fileType" label="File Type">
                                <Select
                                    defaultValue="Select file type"
                                    onChange={onSelect}
                                >
                                    <Option value="PDF">PDF</Option>
                                    <Option value="Java">Java</Option>
                                    <Option value="C">C</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

export default DbCreator;
