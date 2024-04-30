"use client";
import { UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, FormProps, Input } from "antd";
import React from "react";
type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Login = () => {
  return (
    <div className="flex justify-center items-center">
      <p>Login here</p>
      <form action="">
        <Input
          size="large"
          placeholder="large size"
          prefix={<UserOutlined />}
        />
        <Input.Password placeholder="input password" />
        <Button type="primary">Submit</Button>
      </form>
    </div>
  );
};

export default Login;
