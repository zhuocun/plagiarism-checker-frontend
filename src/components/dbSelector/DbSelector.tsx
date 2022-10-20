import { selectDatasets } from "../../redux/dataset/slice";
import { Button, notification } from "antd";
import React from "react";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { SafetyCertificateOutlined } from "@ant-design/icons";
import { NotificationPlacement } from "antd/es/notification";

const DbSelector: React.FC<{
    datasets: string[],
    assignmentId: string | undefined
}> = ({ datasets, assignmentId }) => {
    const dispatch = useReduxDispatch();
    const jwtToken = useReduxSelector((s) => s.authentication.jwtToken);
    const openNotification = (
        description: string,
        placement: NotificationPlacement
    ) => {
        notification.open({
            message: "Notification",
            placement,
            description,
            duration: 1.2
        });
    };
    if (datasets.length) {
        return (
            <Button
                icon={<SafetyCertificateOutlined />}
                type={"default"}
                style={{ float: "right", marginRight: 10 }}
                onClick={() =>
                    dispatch(
                        selectDatasets({ jwtToken, datasets, assignmentId })
                    ).then(() => {
                        openNotification("Operation Successful", "top");
                    })
                }
            >
                Set Datasets
            </Button>
        );
    } else
        return (
            <Button
                disabled
                icon={<SafetyCertificateOutlined />}
                type={"default"}
                style={{ float: "right", marginRight: 10 }}
            >
                Set Datasets
            </Button>
        );
};

export default DbSelector;
