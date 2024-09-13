import React, { useState } from "react";
import {
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import Fastfood from "./Fastfood";
import Breakfast from "./Breakfast";
import Lunch from "./Lunch";
import Dinner from "./Dinner";
import DashBoard from "./DashBoard";
import Starter from "./Starter";
import Beverage from "./Beverage";
import MainCourse from "./MainCourse";
import Cart from "./Cart";
import { Button, Avatar, Input } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Userdetail from "./Userdetail";

const { Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
const items: MenuItem[] = [
  getItem("USER", "1", <PieChartOutlined />),
  getItem("CATEGORY", "sub1", <UserOutlined />, [
    getItem("BREAK-FAST", "2"),
    getItem("LUNCH", "3"),
    getItem("DINNER", "4"),
    getItem("BEAVRAGE", "8"),
  ]),
  getItem("SUB CATEGORY", "sub2", <TeamOutlined />, [
    getItem("DOSA", "5"),
    getItem("PARATHA", "6"),
    getItem("FASTFOOD", "7"),
  ]),
  getItem("WALLET", "9", <FileOutlined />),
];
const User: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handelMenuClick = (e: { key: string }) => {
    setSelectedMenuItem(e.key);
  };
  const handelLogout = () => {
    // Navigate to the login page
    window.location.href = "/";
  };
  const handelcheckcart = () => {
    setSelectedMenuItem("cart");
  };
  const handeluserdetail = () => {
    setSelectedMenuItem("Userdetail");
  };
  const renderContent = () => {
    switch (selectedMenuItem) {
      case "7":
        return <Fastfood />;
      case "5":
        return <Starter />;
      case "6":
        return <MainCourse />;
      case "8":
        return <Beverage />;
      case "2":
        return <Breakfast />;
      case "3":
        return <Lunch />;
      case "4":
        return <Dinner />;
      case "1":
        return <DashBoard />;
      case "cart":
        return <Cart />;
      case "userdetail":
        return <Userdetail />;

      default:
        return <div>Welcome to the Dashboard</div>;
    }
  };
  return (
    <>
      <Layout style={{ minHeight: "98vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
            onClick={handelMenuClick}
            style={{ flexGrow: 1 }}
          />
          {/* <div
            style={{
              padding: "10px 0",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            <Button
              type="primary"
              icon={<LogoutOutlined />}
              onClick={handelLogout}
              style={{ width: "60%" }}
            >
              Logout
            </Button>
          </div> */}
        </Sider>
        <Layout>
          {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
          <Content style={{ margin: "0 16px" }}>
            {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
            {
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "20px",
                  background: "#f5f5f5",
                  marginLeft: "200px",
                  // marginTop: "50px",
                }}
              >
                <Input
                  placeholder="Search"
                  style={{ width: 500, marginRight: "300px" }}
                />
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  style={{ marginRight: "20px" }}
                  onClick={handelcheckcart}
                >
                  Check Cart
                </Button>
                <Avatar
                  style={{ backgroundColor: "#87d068" }}
                  onClick={handeluserdetail}
                >
                  s
                </Avatar>

                <Button
                  type="primary"
                  icon={<LogoutOutlined />}
                  onClick={handelLogout}
                  style={{ width: "8%", marginLeft: "13px" }}
                >
                  Logout
                </Button>
              </div>
            }
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {renderContent()}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};
export default User;
