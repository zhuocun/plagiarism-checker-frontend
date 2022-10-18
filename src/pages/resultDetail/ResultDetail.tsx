import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { getDbList } from "../../redux/dataset/slice";
import { getResultDetail, setResult } from "../../redux/resultDetail/slice";
import { ResultDetailList } from "../../components";
import type { NotificationPlacement } from "antd/es/notification";
import { Button, Select, Spin, notification } from "antd"
import { useNavigate } from "react-router-dom";


export const ResultDetail: React.FC = () => {

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

    const { Option } = Select

    const navigate = useNavigate();
    const dispatch = useReduxDispatch();
    const jwtToken = useReduxSelector((state) => state.authentication.jwtToken);
    const [params, setParams] = useSearchParams();
    const asID = params.get("asID");
    const resultId = params.get("resultId");
    const dbList = useReduxSelector( (s) => s.db.dbList)
    const [selectedDataset, setSelectedDataset]  = useState("")
    const resultDetail = useReduxSelector( (s) => s.resultDetail.resultDetail)
    const detailLoading = useReduxSelector( (s) => s.resultDetail.detailLoading )
    const userType = useReduxSelector ( (s) => s.authentication.userType )

    const setResponse = useReduxSelector( (s) => s.resultDetail.setResponse )
    let setError = null;
    const setLoading = useReduxSelector( (s) => s.resultDetail.setLoading)

    let failedId:string;

    // @ts-ignore
    for (let i of dbList) {
        if (i.datasetName == "failedDataset") {
            failedId = i._id

        }
    }


    useEffect(() => {
        if (jwtToken&&asID&&resultId) {
            dispatch(getDbList({jwtToken, assignmentId: asID}))
            dispatch(getResultDetail({jwtToken, resultId: resultId}))
        }
    }, [])




    const renderSimilarity = () => {
       // @ts-ignore
        if ( resultDetail?.similarity <= 0.3) {
            return <div style={{color:"green"}}>{resultDetail?.similarity}</div>
       }
        // @ts-ignore
        else if (resultDetail?.similarity <= 0.6) {
            return <div style={{color:"orange",}}>{resultDetail?.similarity}</div>
        }
        else {
            return <div style={{color:"red"}}>{resultDetail?.similarity}</div>
        }


    }
    // const innerHTML = resultDetail? resultDetail.htmlStrings:""
    let innerHTML: string =""
    if (resultDetail?.htmlStrings) {
        for (let i=0; i<resultDetail.htmlStrings.length; i++ )
        if (resultDetail.htmlStrings[i] != null ) {
            innerHTML! += resultDetail.htmlStrings[i]
        }

    }


    const Reject = () => {
        if (jwtToken&&resultId) {
            dispatch(setResult({
                jwtToken,
                datasetId: failedId,
                resultId: resultId,
                pof: "failed"
            }))
        }
        setTimeout(()=>{
            if (setResponse == "200") {
                openNotification("Reject Result Successful", "top");
                navigate('/result')
            }
            else {
                console.log(setResponse)
                openNotification("Set Result Failed", "top");
            }
        },4000)
    }

    const selectDataset = (s:string) => {
        setSelectedDataset(s)
    }

    const setDataset = () => {
        if (jwtToken&&resultId&&selectedDataset) {
            dispatch(setResult({
                jwtToken,
                datasetId:selectedDataset,
                resultId: resultId,
                pof: "passed"
            }))
        }
        setTimeout(()=>{
            if (setResponse == "200" ) {
                openNotification("Set Result Successful", "top");
                navigate('/result')
            }
            else {
                console.log(setResponse)
                openNotification("Set Result Failed", "top");
            }
        },4000)

    }



    return (
        <div>
            <h2>Overall Similarity Rate: <div style={{display:"inline-block"}}>{renderSimilarity()}</div></h2>
            <ResultDetailList loading={detailLoading} resultDetail={resultDetail} />
            <div style={{float:"left", marginTop:"30px", overflow:"hidden"}}>
                <h2>Text (similar text would be in red color)</h2>
                <div style={{backgroundColor:"white", width:"400px", height:"400px", overflow:"auto"}}
                     dangerouslySetInnerHTML={{__html:innerHTML }}
                >
                </div>
            </div>
            {
                (userType === "admin" || userType === "teacher")? <div style={{float:"right", marginTop:"30px",  }}>


                    <div style={{marginTop:"30px"}}>
                        <h3 style={{display:"inline"}}>choose a dataset to save in:  </h3>
                        &nbsp;&nbsp;&nbsp;
                        <Select onChange={selectDataset}>
                            { dbList?.map((item) =>  {
                                if(item.datasetName != "failedDataset") {
                                    return (
                                        <Option value={item._id} key={item._id}>{item.datasetName}</Option>
                                    )
                                }
                            } )}
                        </Select>
                        &nbsp;&nbsp;&nbsp;
                        <Button type="primary" disabled={(selectedDataset==="")} onClick={setDataset}>save</Button>
                        &nbsp;&nbsp;&nbsp;

                    </div>

                    <div style={{marginTop:"30px"}}>

                        &nbsp;&nbsp;&nbsp;
                        <Button danger onClick={Reject}> tag as failed</Button>

                    </div>
                    <Spin spinning={setLoading} size="large" style={{position:"relative", top:"100px", left:"200px"}}/>
                </div> : <div></div>
            }

        </div>
    )
}
