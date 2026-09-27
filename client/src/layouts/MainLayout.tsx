import {
  App as AntApp,
  Button,
  Layout,
  Menu,
  Typography,
} from "antd";
import {
  BarChartOutlined,
  LogoutOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import {
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

interface MainLayoutProps {
  setToken: (token: string | null) => void;
}

function MainLayout({ setToken }: MainLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Remove JWT
    localStorage.removeItem("token");

    // Update React state
    setToken(null);

    // Go back to login
    navigate("/login");
  };

  const menuItems = [
    {
      key: "/products",
      icon: <ShoppingOutlined />,
      label: "Products",
    },
    {
      key: "/report",
      icon: <BarChartOutlined />,
      label: "Report",
    },
  ];

  return (
    <AntApp>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider>
          <div
            style={{
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              strong
              style={{
                color: "white",
                fontSize: 18,
              }}
            >
              Product System
            </Text>
          </div>

          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={({ key }) => navigate(key)}
          />
        </Sider>

        <Layout>
          <Header
            style={{
              padding: "0 24px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              background: "#fff",
            }}
          >
            <Button
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Header>

          <Content style={{ padding: 24 }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </AntApp>
  );
}

export default MainLayout;