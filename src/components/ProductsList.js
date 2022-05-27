import React, { useState, useEffect } from 'react';
// import axios from '../services/api';
import { Button, Table, Input } from 'antd';
import { getAllItems } from '../services/ItemApi';
import PurchaseForm from './PurchaseForm';
import { createPurchase } from '../services/PurchaseApi';

const { Search } = Input;

export default function ProductsList({ userBal, updateHomeBalance }) {
  const [refresh, setRefresh] = useState(false);
  const [itemData, setItemData] = useState([]);
  const [search, setSearh] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      const result = await getAllItems(search);
      setItemData(result.data.items);
    };
    fetchItems();
  }, [search, refresh]);

  // MODAL
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalItem, setModalItem] = useState({
    item_id: '',
    item_name: '',
    stock_qty: '',
    price_of_unit: '',
    seller_ip: '',
  });

  const showModal = (item) => {
    setModalItem(item);
    setVisible(true);
  };

  const handleOk = async (values) => {
    const purchaseItem = {
      userId: 1,
      itemId: modalItem.item_id,
      itemName: modalItem.item_name,
      sellerIp: modalItem.seller_ip,
      quantity: values.quantity,
      totalPrice: modalItem.price_of_unit * values.quantity,
      cardNum: values.cardNumber,
      cardPin: values.cardPin,
    };
    setConfirmLoading(true);
    try {
      await createPurchase(purchaseItem);
      setRefresh(!refresh);
      setVisible(false);
      setConfirmLoading(false);
      updateHomeBalance();
    } catch (error) {
      setConfirmLoading(false);
      setErrorMsg(error.response.data.error);
      setTimeout(() => setErrorMsg(null), 4000);
    }
  };

  const handleCancel = () => {
    setVisible(false);
    setConfirmLoading(false);
  };

  const onSearch = (value) => setSearh(value);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'item_id',
    },
    {
      title: 'Item Name',
      dataIndex: 'item_name',
    },
    {
      title: 'Stock',
      dataIndex: 'stock_qty',
    },
    {
      title: 'Price',
      dataIndex: 'price_of_unit',
    },
    {
      title: 'Seller',
      dataIndex: 'seller_ip',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button onClick={() => showModal(record)}>BUY</Button>
      ),
    },
  ];
  return (
    <>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        className="search-bar"
      />
      <Table
        columns={columns}
        dataSource={itemData}
        rowKey={(record) => `${record.seller_ip}-${record.item_id}`}
      />
      <PurchaseForm
        title="Purchase Item"
        centered
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        itemBuy={modalItem}
        userBal={userBal}
        errorMsg={errorMsg}
      />
      ;
    </>
  );
}
