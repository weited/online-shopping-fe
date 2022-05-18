// import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';
// import 'antd/dist/antd.css';
// import {} from 'antd';
import { Tabs } from 'antd';
import ProductsList from './components/ProductsList';
import PurchaseList from './components/PurchaseList';
import { getUserById } from './services/UserApi';
// import CardForm from './components/CardForm';
import CardTopup from './components/CardTopup';

// const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}
function App() {
  console.log('inside APP');
  const [refresh, setRefresh] = useState(false);
  const [userData, setUserData] = useState({
    id: '',
    balance: null,
  });

  const updateHomeBalance = () => {
    console.log('update!!!!!!!!!!!!!!!');
    setRefresh(!refresh);
    // setUserData({ ...userData, balance });
  };

  useEffect(() => {
    // setRefresh(false);
    console.log('useefffect app!!!!!!!!!!!!!!!');
    const fetchUser = async () => {
      const result = await getUserById();
      setUserData(result.data);
    };
    fetchUser();
  }, [refresh]);

  return (
    // <Layout className="layout">
    //   <Header>
    //     <div className="logo" />
    //     <Menu
    //       theme="dark"
    //       mode="horizontal"
    //       defaultSelectedKeys={['1']}
    //       items={[
    //         { key: 1, label: 'production' },
    //         { key: 2, label: 'purchase' },
    //       ]}
    //     />
    //     <div>Your balance is: 300</div>
    //   </Header>
    //   <Content style={{ padding: '0 50px' }}>
    //     {/* <Breadcrumb style={{ margin: '16px 0' }}>
    //       <Breadcrumb.Item>Home</Breadcrumb.Item>
    //       <Breadcrumb.Item>List</Breadcrumb.Item>
    //       <Breadcrumb.Item>App</Breadcrumb.Item>
    //     </Breadcrumb> */}
    //     <div className="site-layout-content">
    //       Content
    //       <ProductsList />
    //     </div>
    //   </Content>
    //   <Footer style={{ textAlign: 'center' }}>
    //     Ant Design ©2018 Created by Ant UED
    //   </Footer>
    // </Layout>
    <div className="App">
      <header className="App-header">
        KIT514 Shpping, Your balance is: {userData?.balance}
      </header>
      <div className="main-page">
        <section className="display">
          <Tabs
            defaultActiveKey="1"
            // activeKey="2"
            type="card"
            size="Large"
            onChange={callback}
          >
            <TabPane tab="Product List" key="1">
              <ProductsList userBal={userData.balance} />
            </TabPane>
            <TabPane tab="Purchases" key="2">
              <PurchaseList />
            </TabPane>
            <TabPane tab="Card" key="3">
              <CardTopup updateHomeBalance={updateHomeBalance} />
            </TabPane>
          </Tabs>
        </section>
      </div>
    </div>
  );
}

export default App;
