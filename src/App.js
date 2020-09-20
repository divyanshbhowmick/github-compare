import React, { useState, useEffect } from "react";
import { CustomCard } from "./components/CustomCard";
import "./App.css";

import {
  Layout,
  Menu,
  Breadcrumb,
  Avatar,
  Input,
  Card,
  Row,
  Col,
  Button,
  PageHeader,
} from "antd";
// import {GitlabOutlined} from "@ant-design/icons";

function App() {
  const { Header, Content, Footer } = Layout;
  const { Search } = Input;

  // const [query, setQuery] = useState('');
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  // const [index, setIndex] = useState(0);
  // setData(...[data], {
  //   username: 'souptik5',
  //   followers: '100',
  //   following: '50',
  //   repos: '69',
  //   gists: '42',
  // })
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log(data);
    let resJson = {};
    const fetchFunc = async () => {
      if (query.length > 0) {
        const response = await fetch(`https://api.github.com/users/${query}`);
        resJson = await response.json();
      }
      // console.log(resJson);
      if (resJson.login) {
        setData((data) => [...data, resJson]);
      }
    };
    fetchFunc();
  }, [query]);

  const resetUsers = () => {
    setData([]);
  };

  return (
    <Layout className="layout">
      <Header>
        <Avatar
          className="logo"
          src="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        ></Avatar>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["0"]}
          style={{ fontSize: "20px" }}
        >
          <Menu.Item key="1">GitHubCompare</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content" style={{ overflowY: "auto" }}>
          <Row style={{ paddingBottom: "24px" }}>
            <Col span={8}></Col>
            <Col span={8}>
              <Search
                placeholder="Enter a GitHub username"
                enterButton="Compare"
                size="large"
                onSearch={(value) => setQuery(value)}
              />
            </Col>
          </Row>
          <Row>
            {data.length > 0 ? (
              <Col span={24}>
                <Card>
                  <PageHeader
                    title="Compare 🛠"
                    extra={[
                      <Button
                        key="1"
                        type="primary"
                        style={{ width: "100px" }}
                        onClick={resetUsers}
                      >
                        Reset
                      </Button>,
                    ]}
                  ></PageHeader>
                  <div className="Data">
                    <Row gutter="4">
                      {data.map((data, i) => (
                        <Col span={6} key={i}>
                          <CustomCard userdata={data} index={i} />
                        </Col>
                      ))}
                    </Row>
                  </div>
                </Card>
              </Col>
            ) : (
              <Col span={24}></Col>
            )}
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: "right" }}>
        Souptik Kumar Saha ©2020 Created by Souptik Kumar Saha
      </Footer>
    </Layout>
  );
}

export default App;
