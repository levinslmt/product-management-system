import {
  Button,
  Card,
  Form,
  Input,
  message,
  Typography,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

const { Title, Text } = Typography;

interface RegisterFormValues {
  username: string;
  password: string;
  confirmPassword: string;
}

function Register() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const handleRegister = async (values: RegisterFormValues) => {
    try {
      await api.post("/auth/register", {
        username: values.username,
        password: values.password,
      });

      messageApi.success("Registration successful!");

      setTimeout(() => {
        navigate("/login");
      }, 800);
    } catch (error: any) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message ||
        "Unable to connect to the server";

      messageApi.error(errorMessage);
    }
  };

  return (
    <div className="login-page">
      {contextHolder}

      <Card className="login-card">
        <div className="login-header">
          <Title level={2}>Create Account</Title>

          <Text type="secondary">
            Register for the Product Management System
          </Text>
        </div>

        <Form
          layout="vertical"
          onFinish={handleRegister}
          size="large"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please enter a username",
              },
              {
                min: 3,
                message: "Username must be at least 3 characters",
              },
            ]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter a password",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters",
              },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error("Passwords do not match"),
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm your password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
            >
              Register
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center" }}>
            <Text type="secondary">
              Already have an account?{" "}
              <Link to="/login">Login</Link>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default Register;