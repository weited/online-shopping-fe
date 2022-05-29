import React, { useEffect, useState } from 'react';
import './App.css';
import { Layout, Tabs } from 'antd';
import ProductsList from './components/ProductsList';
import PurchaseList from './components/PurchaseList';
import { getUserById } from './services/UserApi';
import CardTopup from './components/CardTopup';

const { Header, Content } = Layout;
const { TabPane } = Tabs;

function App() {
  const [refresh, setRefresh] = useState(false);
  const [userData, setUserData] = useState({
    id: '',
    balance: null,
  });

  const updateHomeBalance = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const result = await getUserById();
      setUserData(result.data);
    };
    fetchUser();
  }, [refresh]);

  return (
    <Layout theme="light">
      <Header>
        KIT514 Online Shopping, Your balance is: {userData?.balance}
      </Header>
      <Content>
        <div className="App">
          <div className="main-page">
            <section className="display">
              <Tabs
                defaultActiveKey="1"
                // activeKey="2"
                type="card"
                size="Large"
              >
                <TabPane tab="Product List" key="1">
                  <ProductsList
                    userBal={userData.balance}
                    updateHomeBalance={updateHomeBalance}
                  />
                </TabPane>
                <TabPane tab="Purchases" key="2">
                  <PurchaseList updateUi={refresh} />
                </TabPane>
                <TabPane tab="Card" key="3">
                  <CardTopup updateHomeBalance={updateHomeBalance} />
                </TabPane>
              </Tabs>
            </section>
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default App;
