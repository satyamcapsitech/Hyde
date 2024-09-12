import React, { useState } from "react";
import {
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar,Button, Layout, Menu, theme } from "antd";
import Atndee from "./Atndee";
import Subcategory from "./subcategory";
import Category from "./category";
import Items from "./Items";

const {Content, Footer, Sider } = Layout;

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
  getItem("ADMIN", "1", <PieChartOutlined />),

  getItem("CATEGORY", "2", <UserOutlined></UserOutlined>),

  getItem("SUBCATEGORY", "3", <UserOutlined></UserOutlined>),

  getItem("ITEMS", "4", <UserOutlined></UserOutlined>),
  getItem("STAFF", "10", <UserOutlined />),
  getItem("TAG", "11", <TeamOutlined />),

  getItem("TABLE", "12", <TeamOutlined />),
  getItem("ORDERS", "13", <TeamOutlined />),
];

const Admin = () => {
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
  const renderContent = () => {
    switch (selectedMenuItem) {
      case "2":
        return <Category />;
      case "3":
        return <Subcategory />;
      case "4":
        return <Items />;
      case "10":
        return <Atndee />;
      // case "2":
      //   return <Category />;

      default:
        return <div>Welcome to the Dashboard</div>;
    }
  };
  return (
    <Layout style={{ minHeight: "95vh" }}>
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
        {/* <Header style={{ padding: 0, background: colorBgContainer }}></Header> */}
        {/* <div
          style={{
            padding: "10px 0",
            textAlign: "center",
            marginBottom: "10px",
          }}
        > */}
                      <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "10px ",
                  background: "#f5f5f5",
                  marginLeft: "200px",
                  // marginTop: "50px",
                }}
              >
                {/* <Input
                  placeholder="Search"
                  style={{ width: 500, marginRight: "300px" }}
                />
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  style={{ marginRight: "20px" }}
                > */}
                  {/* Check Cart
                </Button> */}
                <Avatar style={{ backgroundColor: "#87d068" }}>s</Avatar>
                
            
            <Button
              type="primary"
              icon={<LogoutOutlined />}
              onClick={handelLogout}
              style={{ width: "8%", marginLeft:"13px" }}
            >
              Logout
            </Button>
          </div>

        <Content style={{ margin: "0 16px" }}>
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
  );
};

export default Admin;
