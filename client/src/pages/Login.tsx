import { Button, Card, Form, Input, message, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

const { Title, Text } = Typography;

interface LoginProps {
  setToken: (token: string) => void;
}

interface LoginFormValues {
  username: string;
  password: string;
}

function Login({ setToken }: LoginProps) {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const handleLogin = async (values: LoginFormValues) => {
    try {
      const response = await api.post("/auth/login", values);

      const token = response.data.token;

      // Save token
      localStorage.setItem("token", token);

      // Update React state
      setToken(token);

      messageApi.success("Login successful!");

      console.log("Logged in user:", response.data.user);

      // Go to products
      navigate("/products");
    } catch (error: any) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message || "Unable to connect to the server";

      messageApi.error(errorMessage);
    }
  };

  return (
    <div className="login-page">
      {contextHolder}

      <Card className="login-card">
        <div className="login-header">
          <Title level={2}>Welcome Back</Title>

          <Text type="secondary">
            Sign in to your Product Management System
          </Text>
        </div>

        <Form layout="vertical" onFinish={handleLogin} size="large">
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please enter your username",
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
                message: "Please enter your password",
              },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
            <div style={{ textAlign: "center" }}>
              <Text type="secondary">
                Don't have an account? <Link to="/register">Register</Link>
              </Text>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
