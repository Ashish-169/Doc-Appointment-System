"use client";
import { FC, useContext } from "react";
import { Form, Input, Button } from "antd";
import Link from "next/link";
import { EventContext } from "@/context/appointment_contex"; // Import the context
import { RegisterType } from "@/types/RegisterType";

const RegisterPage: FC = () => {
  const { register } = useContext(EventContext)!; // Access register from context

  const onFinishHandler = async (values: RegisterType) => {
    console.log("Form values:", values);
    await register(values); // Call register function
  };

  // Handle form change
  const handleChange = (changedValues: any) => {
    console.log("Changed Values:", changedValues);
  };

  return (
    <div className="form-container">
      <Form
        layout="vertical"
        onFinish={onFinishHandler}
        onValuesChange={handleChange} // Add this line
        className="register-form"
      >
        <h1 style={{ marginBottom: "20px" }}>Register</h1>
        <Form.Item label="Name" name="name">
          <Input type="text" required />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>
        <Link href="/login" className="mg-2">
          Already have an account?
        </Link>
        <Form.Item style={{ marginTop: "20px" }}>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;
