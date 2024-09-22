"use client";
import { FC, useContext } from "react";
import { Form, Input, Button } from "antd";
import Link from "next/link";
import { EventContext } from "@/context/appointment_contex";
import { LoginType } from "@/types/LoginType";

const LoginPage: FC = () => {
  const { login, setLoginData } = useContext(EventContext) || {};

  // Handle form change
  const handleChange = (changedValues: any) => {
    console.log("Changed Values:", changedValues);
    setLoginData((prev: any) => ({
      ...prev,
      ...changedValues,
    }));
  };

  // Handle form submission
  const handleSubmit = async (values: LoginType) => {
    // Update loginData state with the submitted values
    setLoginData(values);

    // Proceed to login
    if (login) {
      await login(values);
    }
  };

  return (
    <main>
      <div className="form-container">
        <Form
          layout="vertical"
          className="register-form"
          onValuesChange={handleChange}
          onFinish={handleSubmit} // Handle form submission
        >
          <h1 style={{ marginBottom: "20px" }}>Login</h1>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Link href="/register" className="mg-2">
            Register?
          </Link>
          <Form.Item style={{ marginTop: "20px" }}>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </main>
  );
};

export default LoginPage;
