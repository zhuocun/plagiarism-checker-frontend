import React, { useEffect, useState } from "react";
import styles from "./ResultListPage.module.css";
import { ResultList } from "../../components";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { getResultList } from "../../redux/result/slice";
import { getAsgmtList } from "../../redux/asgmt/slice"
import { Form, Row, Col, Select, Button } from "antd";

export const ResultListPage = () => {
    const {Option} = Select
    const subject = useReduxSelector((s) => s.subjectList.subjectList)
    const [Assignment, setAssignment] = useState<IAssignment[]>([])
    const [showAssignment, setShowAssignment] = useState(true)
    const [showButton, setShowButton] = useState(true)
    const [chosenAssignment, SetChosenAssignment] = useState("")
    const [result, setResult] = useState<IResult[]>([])
    const jwtToken = useReduxSelector((s) => s.authentication.jwtToken) as string;
   
    const loading = useReduxSelector(s => s.result.loading);
    const dispatch = useReduxDispatch();


    useEffect(() => {
       
      
  }, []);

    
    const getAssignment = async (s:string) => {
      const response = await dispatch(getAsgmtList({jwtToken, subjectId:s}))
      if (response.payload) {
        setAssignment(response.payload)
        setShowAssignment(false)
      }  
    }

    const setSubject =   (s:string) => {
        
        setShowAssignment(true)
        setShowButton(true)
        getAssignment(s)  
    }

    const choseAssignment = (s:string) => {
      SetChosenAssignment(s)
      setShowButton(false)
    }

    const getResult = async () => {
      const response = await dispatch(getResultList({jwtToken, assigmentID: chosenAssignment } ))
      setResult(response.payload)
      console.log(response.payload)
    }

    return (
      <div >
        <div className={styles['selector-container']}>
          <Form >
            <Row  gutter={30}  >
              <Col span={8}>
                <Form.Item
                  name="subject"
                  label="Subject"     
                >
                  <Select onSelect={setSubject}>
                    {subject?.map((i)=> <Option value={i._id} key={i._id}>{i.subjectName}</Option> )}
                  </Select>
                </Form.Item> 
              </Col>
              <Col span={8}>
                <Form.Item
                  name="assignment"
                  label="Assignment"
                   
                >
                  <Select onSelect={choseAssignment} placeholder="Choose Your Assignment" disabled={showAssignment}>
                    {Assignment?.map((i)=> <Option value={i._id} key={i._id}>{i.assignmentName}</Option> )}
                  </Select>
                </Form.Item> 
              </Col>
              <Col span={8}>
                <Button disabled={showButton} type="primary" onClick={getResult} >Get Result</Button>
              </Col>
            </Row>
          </Form>
        </div>
         

        <div className={styles["assign-container"]}>
            <div className={styles["teacherAssignTable-container"]}>
                <ResultList loading={loading} resultList={result} />
            </div>
        </div>
      </div>
    );
};
