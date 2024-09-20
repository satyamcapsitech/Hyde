import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
type FieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};
const Login: React.FC = () => {
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const response = await axios.get("https://localhost:7015/api/UserDetail");
      const users = response.data;

      const user = users.find(
        (user: { username: string; password: string; role: string }) =>
          user.username === values.username && user.password === values.password
      );
      if (user) {
        if (user.role === "Admin") {
          navigate("/Admin");
        } else if (user.role === "User") {
          navigate("/User");
        } else {
          message.error("Invalid user role");
        }
      } else {
        message.error("Invalid username or password");
      }
    } catch (error) {
      message.error(
        "Failed to fetch user details: " +
          (error.response?.data?.message || "Unknown error")
      );
    }
  };
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="i">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
