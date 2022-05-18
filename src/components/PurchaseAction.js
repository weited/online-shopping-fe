import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

// console.log('$$$$$$$$$', itemQtyRange);
export default function PurchaseAction() {
  const itemQtyRange = [];
  const itemQty = 2;
  // console.log('inside Purchase Action');
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < itemQty + 1; i++) {
    itemQtyRange.push(<Option key={i}>{i}</Option>);
  }

  // console.log('@@@@@@@@@', itemQtyRange);
  // console.log('#########');
  return (
    <div>
      This is the purchase tablsfsfe
      <Select
        // size={size}
        defaultValue="1"
        // onChange={handleChange}
        style={{ width: 200 }}
      >
        {itemQtyRange}
      </Select>
    </div>
  );
}
