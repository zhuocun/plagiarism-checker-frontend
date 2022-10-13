import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DbList, UploadBox } from "../../components";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import styles from "./OperationPage.module.css";
import { Button, Col, InputNumber, Row, Select, Spin } from "antd";
import { BufferFileList } from "../../components/bufferFileList/BufferFileList";
import { getBufferFileList } from "../../redux/bufferFileList/slice";
import { getDbList } from "../../redux/dataset/slice";
import AsgmtDbCreator from "../../components/dbCreator/DbCreator";
import { callChecker } from "../../redux/result/slice";
import DbSelector from "../../components/dbSelector/DbSelector";
import { RightCircleOutlined, UploadOutlined } from "@ant-design/icons";

export const OperationPage: React.FC = () => {
    const { Option } = Select;

    const jwtToken = useReduxSelector((s) => s.authentication.jwtToken) as string;
    const bufferFileLoading = useReduxSelector((s) => s.bufferFileList.loading);
    const bufferFileList = useReduxSelector((s) => s.bufferFileList.bufferFileList);
    const dbLoading = useReduxSelector(s => s.db.loading);
    const dbList = useReduxSelector(s => s.db.dbList);
    const asgmtList = useReduxSelector(s => s.assignmentList.asgmtList);
    const userType = useReduxSelector(s => s.authentication.userType);
    const { assignmentName } = useParams();
    const [dataType, setDataType] = useState("");
    const [uploadedType, setUploadedType] = useState<string>("");
    const [datasets, setDatasets] = useState<string[]>([]);
    const [threshold, setThreshold] = useState<string>("");
    const [granularity, setGranularity] = useState<string>("");
    let assignmentId: string | undefined = undefined;
    if (asgmtList) {
        for (const a of asgmtList) {
            if (a.assignmentName === assignmentName) {
                assignmentId = a._id;
            }
        }
    }
    const dispatch = useReduxDispatch();
    useEffect(() => {
        //PubSub.publish("title", assignmentName);
        if (jwtToken) {
            dispatch(getBufferFileList({ jwtToken, assignmentId }));
            dispatch(getDbList({ jwtToken, assignmentId }));
        }
    }, [jwtToken, assignmentId]);

    const onSetDataType = (value: string) => {
        setDataType(value);
    };

    const onUploadedFileType = (value: string) => {
        setUploadedType(value);
    };

    const onSetThreshold = (value: string) => {
        setThreshold(value);
    };

    const onSetGranularity = (value: string) => {
        setGranularity(value);
    };

    const onCheck = async () => {
        dispatch(callChecker({
            jwtToken,
            assignmentId,
            granularity,
            fileType: dataType
        }));
    };

    if (dbLoading || bufferFileLoading) {
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
            {userType !== "student" ?
                <Row>
                    <Col span={9} style={{ margin: "auto" }}>
                        <BufferFileList assignmentId={assignmentId} loading={bufferFileLoading}
                                        bufferFileList={bufferFileList} />
                        <div className={styles.button}>
                            {uploadedType !== "" ?
                                <UploadBox fileType={uploadedType} assignmentId={assignmentId} />
                                : <Button disabled icon={<UploadOutlined />}>
                                    Upload
                                </Button>}
                        </div>
                        <div style={{ float: "right" }}>
                            <Select
                                className={styles.setter}
                                showSearch
                                placeholder="Set file type"
                                onChange={onUploadedFileType}
                                optionFilterProp="type"
                                filterOption={(input, option) =>
                                    (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                                }
                            >
                                <Option value=".pdf" key={1}>PDF</Option>
                                <Option value=".java" key={2}>Java</Option>
                                <Option value=".c" key={3}>C</Option>
                            </Select>
                        </div>
                    </Col>
                    <Col span={9} style={{ margin: "auto" }}>
                        <DbList
                            loading={dbLoading}
                            assignmentId={assignmentId}
                            asgmtDbList={dbList}
                            setDatasets={setDatasets}
                        />
                        <div className={styles.button}>
                            <AsgmtDbCreator assignmentId={assignmentId} />
                        </div>
                        <DbSelector assignmentId={assignmentId} datasets={datasets} />
                    </Col>
                </Row> :
                <div style={{ margin: "auto" }}>
                    <BufferFileList assignmentId={assignmentId} loading={bufferFileLoading}
                                    bufferFileList={bufferFileList} />
                    <div className={styles.button}>
                        {uploadedType !== "" ?
                            <UploadBox fileType={uploadedType} assignmentId={assignmentId} />
                            : <Button disabled icon={<UploadOutlined />}>
                                Upload
                            </Button>}
                    </div>
                    <div style={{ float: "right" }}>
                        <Select
                            className={styles.setter}
                            showSearch
                            placeholder="Set file type"
                            onChange={onUploadedFileType}
                            optionFilterProp="type"
                            filterOption={(input, option) =>
                                (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                            }
                        >
                            <Option value=".pdf" key={1}>PDF</Option>
                            <Option value=".java" key={2}>Java</Option>
                            <Option value=".c" key={3}>C</Option>
                        </Select>
                    </div>
                </div>
            }
            {userType !== "student" ?
                <div style={{ marginTop: 250, float: "right", marginRight: 64 }}>
                    <Row>
                        <Select
                            className={styles.setter}
                            showSearch
                            placeholder="Set file type"
                            onChange={onSetDataType}
                            optionFilterProp="type"
                            filterOption={(input, option) =>
                                (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                            }
                        >
                            <Option value="pdf" key={1}>PDF</Option>
                            <Option value="java" key={2}>Java</Option>
                            <Option value="c" key={3}>C</Option>
                        </Select>

                        <Select
                            className={styles.setter}
                            showSearch
                            placeholder="Set threshold"
                            onChange={onSetThreshold}
                            optionFilterProp="type"
                            filterOption={(input, option) =>
                                (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                            }
                        >
                            <Option value="10%" key={1}>10%</Option>
                            <Option value="15%" key={2}>15%</Option>
                            <Option value="20%" key={3}>20%</Option>
                            <Option value="25%" key={4}>25%</Option>
                        </Select>
                        <InputNumber placeholder="Set granularity" className={styles.setter}
                                     onChange={onSetGranularity}>
                        </InputNumber>

                        <Button icon={<RightCircleOutlined />} onClick={onCheck}>
                            Check
                        </Button>
                    </Row>
                </div>
                : <div style={{ marginTop: 250, marginLeft: 750 }}>
                    <Row>
                        <Select
                            className={styles.setter}
                            showSearch
                            placeholder="Set file type"
                            onChange={onSetDataType}
                            optionFilterProp="type"
                            filterOption={(input, option) =>
                                (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                            }
                        >
                            <Option value="pdf" key={1}>PDF</Option>
                            <Option value="java" key={2}>Java</Option>
                            <Option value="c" key={3}>C</Option>
                        </Select>

                        <Button icon={<RightCircleOutlined />} onClick={onCheck}>
                            Check
                        </Button>
                    </Row>

                </div>}
        </div>
    );
};
