import React, { useState, useEffect } from 'react';
// import axios from '../services/api';
import { Button, Table, Input } from 'antd';
import { getAllItems } from '../services/ItemApi';
import PurchaseForm from './PurchaseForm';
import { createPurchase } from '../services/PurchaseApi';

const { Search } = Input;

export default function ProductsList({ userBal }) {
  console.log('rendered Product List');
  // const productData = {};
  const [refresh, setRefresh] = useState(false);
  const [itemData, setItemData] = useState([
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
    console.log('fetch all####################################');
    const fetchItems = async () => {
      const result = await getAllItems(search);
      setItemData(result.data.items);
    };
    fetchItems();
  }, [search, refresh]);

  // MODAL
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [modalText, setModalText] = useState('Content of the modal');
  const [modalItem, setModalItem] = useState({
    item_id: '',
    item_name: '',
    stock_qty: '',
    price_of_unit: '',
    seller_ip: '',
  });

  // useEffect(() => {
  //   if (refresh) setRefresh(false);
  //   console.log('refresed!!!!!!!!');
  //   console.log('modalItem is ', modalItem);
  // }, [refresh]);
  const showModal = (item) => {
    setModalItem(item);
    // setRefresh(true);
    setVisible(true);
    // console.log('the selected item is', JSON.stringify(item));
  };

  const handleOk = async (values) => {
    // setModalText('The modal will be closed after two seconds');
    const purchaseItem = {
      userId: 1,
      itemId: modalItem.item_id,
      sellerIp: modalItem.seller_ip,
      quantity: values.quantity,
      totalPrice: modalItem.price_of_unit * values.quantity,
      cardNum: values.cardNumber,
      cardPin: values.cardPin,
    };
    setConfirmLoading(true);
    console.log('Received values of form: ', values);
    console.log('the purchase item is', JSON.stringify(modalItem));
    try {
      const result = await createPurchase(purchaseItem);
      console.log('######## purchase result', result);
      setRefresh(!refresh);
      setVisible(false);
      setConfirmLoading(false);
    } catch (error) {
      console.log(error);
      setConfirmLoading(false);
      setErrorMsg(error.response.data.error);
      setTimeout(() => setErrorMsg(null), 4000);
    }
  };

  const handleCancel = () => {
    console.log('Clicked cancel button', modalItem);

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
      // render: (text, record) => <Button>BUY || {JSON.stringify(record)}</Button>,
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
