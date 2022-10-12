import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Space,
  Select,
} from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useState } from "react";
import { getAllSbjList, updateSbj } from "../../redux/subject/slice";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { updateUser, getUserList } from "../../redux/user/slice";

const UserUpdateButton: React.FC<{
  userName: string,
  role: string,
  accountStatus: string
  userEmail: string,
}> = ({ userName, role, accountStatus, userEmail }) => {

  const { Option } = Select

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
          const NewuserName = result['UserName']
          const Newrole = result['Role']
          const NewaccountStatus = result['accountStatus']
          const update = {
            username: NewuserName,
            role: Newrole,
            accountStatus: NewaccountStatus
          }
          if (jwtToken) {
            await dispatch(updateUser({jwtToken, userEmail , update }))
            dispatch(getUserList(jwtToken))
          }
          // const subjectName = result["Subject Name"];
          // const teacherEmail: string[] = [];
          // teacherEmail.push(result["Teacher Email"]);
          // dispatch(updateSbj({ jwtToken, subjectId, subjectName, teacherEmail }));
          // if (jwtToken) {
          //     setTimeout(() => {
          //         dispatch(getAllSbjList(jwtToken));
          //     }, 1500);
          // }
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
          title="Update the User"
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
          <Form 
          layout="vertical" 
          form={form}
          initialValues={{UserName: userName, Role: role, accountStatus: accountStatus }}
          
           >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="UserName"
                  label="user Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the New User Name"
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
                  name="Role"
                  label="role"
                  rules={[
                    {
                      required: true,             
                    },
                  ]}
                >
                  <Select>
                    <Option value="teacher">Teacher</Option>
                    <Option value="student">Student</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="accountStatus"
                  label="Account Status"
                  rules={[
                    {
                      required: true,
                    }
                  ]}
                >
                  <Select defaultValue={accountStatus}>
                     
                    <Option value="active">active</Option>
                    <Option value="disable">disable</Option>
                  </Select>
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

export default UserUpdateButton;
