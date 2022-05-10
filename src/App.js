// import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';
// import 'antd/dist/antd.css';
// import {} from 'antd';
import { Tabs, Layout, Menu, Breadcrumb } from 'antd';
import ProductsList from './components/ProductsList';

import { getUserById } from './services/UserApi';
// import PurchaseAction from './components/PurchaseAction';

const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}
function App() {
  const [userData, setUserData] = useState({
    id: '',
    balance: null,
  });

  useEffect(() => {
    const fetchUser = async () => {
      const result = await getUserById();
      setUserData(result.data);
    };
    fetchUser();
  }, []);

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={[
            { key: 1, label: 'production' },
            { key: 2, label: 'purchase' },
          ]}
        />
        <div>Your balance is: 300</div>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <div className="site-layout-content">
          Content
          <ProductsList />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
    // <div className="App">
    //   <header className="App-header">
    //     KIT514 Shpping, Your balance is: {userData?.balance}
    //   </header>
    //   <section className="display">
    //     <Tabs
    //       defaultActiveKey="1"
    //       centered
    //       type="card"
    //       size="Large"
    //       onChange={callback}
    //     >
    //       <TabPane tab="Product List" key="1">
    //         <ProductsList />
    //       </TabPane>
    //       <TabPane tab="Search" key="2">
    //         Content of Tab Pane 2
    //       </TabPane>
    //       <TabPane tab="Perchase" key="3">
    //         Content of Tab Pane 3
    //       </TabPane>
    //     </Tabs>
    //   </section>
    //   <section>
    //     <PurchaseAction />
    //   </section>
    // </div>
  );
}

export default App;
