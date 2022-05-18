import React, { useState, useEffect } from 'react';
// import axios from '../services/api';
import { Button, Table, Input, Modal, Alert } from 'antd';
// import { getAllItems } from '../services/ItemApi';
// import PurchaseForm from './PurchaseForm';
import { getAllPurchases, deletePurchaseById } from '../services/PurchaseApi';

const { Search } = Input;

export default function PurchaseList() {
  console.log('rendered Purchase List');
  // const productData = {};
  const [refresh, setRefresh] = useState(false);
  const [orderData, setOrderData] = useState([
    // {
    //   item_id: ' ',
    //   item_name: ' ',
    //   stock_qty: null,
    //   price_of_unit: null,
    // },
  ]);
  const [search, setSearh] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const result = await getAllPurchases(search);
        setOrderData(result.data);
        setErrorMsg('');
      } catch (error) {
        setErrorMsg(error?.response?.data.error);
      }
    };
    fetchPurchases();
    // if (refresh) setRefresh(false);
    console.log('refresed!!!!!!!!');
  }, [search, refresh]);

  // MODAL
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleOk = async () => {
    setConfirmLoading(true);
    console.log('The selecetd delete id is: ', deleteId);
    try {
      const result = await deletePurchaseById(deleteId);
      console.log('######## purchase result', result);
      setVisible(false);
      setConfirmLoading(false);
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
    setConfirmLoading(false);
  };

  const handleDeleteBtn = async (purId) => {
    setDeleteId(purId);
    setVisible(true);
    console.log('clicked cancle', purId);
  };

  const onSearchUserId = (userId) => {
    console.log('value##########', typeof userId);
    if (userId === '') {
      setSearh('');
      return;
    }
    const query = `user/${userId}`;
    setSearh(query);
  };
  const onSearchPurId = (purId) => {
    setSearh(purId);
  };

  const columns = [
    {
      title: 'Pur ID',
      dataIndex: 'pur_id',
    },
    {
      title: 'Item Name',
      dataIndex: 'item_name',
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
    },
    {
      title: 'Price',
      key: 'price',
      render: (text, record) => `$ ${record.price}`,
    },
    {
      title: 'Seller',
      dataIndex: 'seller_ip',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button onClick={() => handleDeleteBtn(record.pur_id)}>CANCEL</Button>
      ),
    },
  ];
  return (
    <>
      <div className="purchase-search-bar">
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search By User ID"
          onSearch={onSearchUserId}
          size="large"
          className="search-bar"
        />
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search By Purc ID"
          onSearch={onSearchPurId}
          size="large"
          className="search-bar"
        />
      </div>
      {errorMsg && <Alert message={errorMsg} type="error" />}
      <Table columns={columns} dataSource={orderData} rowKey="pur_id" />
      <Modal
        title="Delete order"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Are you sure to delete this order?</p>
      </Modal>
    </>
  );
}
