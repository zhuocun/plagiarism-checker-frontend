import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {ResultText} from "../../components";
import {useReduxDispatch, useReduxSelector} from "../../redux/hooks";
import {getResultList} from "../../redux/result/slice";
import {getResultText} from "../../redux/resultText/slice";
import {ResultStudent} from "../../components/resultDetailList/ResultStudent";
import {Col, Row} from "antd";


export const ResultStudentPage: React.FC = () => {
    const {resID} = useParams();
    const dispatch = useReduxDispatch();
    const jwtToken = useReduxSelector(s=>s.authentication.jwtToken);
    const loading = useReduxSelector((s) => s.result.loading);
    const resultDetail = useReduxSelector((s) => s.result.resultList);

    useEffect(() => {
        PubSub.publish("title", `Result`);
        dispatch(getResultList(jwtToken));
        dispatch(getResultText());
    }, [jwtToken])

    return (
        <Row>
            <Col span={12}>
                <ResultStudent resultDetail={resultDetail}/>
            </Col>
            <Col span={12}>
                <ResultText resultText={"null"}/>
            </Col>
        </Row>
    )
}
