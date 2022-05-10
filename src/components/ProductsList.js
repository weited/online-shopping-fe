import React, { useState, useEffect } from 'react';
// import axios from '../services/api';
import { Button, Table } from 'antd';
import { getAllItems } from '../services/ItemApi';

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
      <Button>Delete || {JSON.stringify(record)}</Button>
    ),
  },
];

export default function ProductsList() {
  // const productData = {};
  const [itemData, setItemData] = useState([
    {
      item_id: ' ',
      item_name: ' ',
      stock_qty: null,
      price_of_unit: null,
    },
  ]);

  useEffect(() => {
    const fetchItems = async () => {
      const result = await getAllItems();
      setItemData(result.data.items);
    };
    fetchItems();
  }, []);

  return <Table columns={columns} dataSource={itemData} rowKey="item_id" />;
}
