import { selectDatasets } from "../../redux/dataset/slice";
import { Button } from "antd";
import React from "react";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { FormOutlined } from "@ant-design/icons";

const DbSelector: React.FC<{ datasets: string[], assignmentId: string | undefined }> = ({ datasets , assignmentId}) => {
    const dispatch = useReduxDispatch();
    const jwtToken = useReduxSelector(s => s.authentication.jwtToken);
    if (datasets.length) {
        return (
            <Button icon={<FormOutlined />} type={"default"} style={{ float: "right", marginRight: 10 }}
                    onClick={() => dispatch(selectDatasets({ jwtToken, datasets, assignmentId}))}>
                Set Datasets
            </Button>
        );
    } else return <></>;
};

export default DbSelector;
