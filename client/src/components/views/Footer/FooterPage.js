import React from "react";
import Icon from "@ant-design/icons";
import { Layout, Menu } from "antd";
const { Header, Content, Footer, Sider } = Layout;

function FooterPage() {
  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.2)",
      }}
    >
      <Footer
        style={{
          margin: "0",
          padding: "5px",
          textAlign: "center",
          background: "#3C44B1",
          color: "white",
          fontSize: "15px",
          fontFamily: "ratiomedium",
        }}
      >
        © Copyright Kfintech 2020 | All Rights Reserved.
      </Footer>
    </div>
  );
}

export default FooterPage;
