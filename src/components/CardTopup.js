/* eslint-disable prefer-regex-literals */
import React, { useState } from 'react';
// import CardForm from './CardForm';
import { Form, Input, Button, InputNumber } from 'antd';
import { addBalance } from '../services/UserApi';
// const { Option } = Select;

export default function CardTopup(props) {
  // const itemQtyRange = [];
  // const itemQty = 2;
  // console.log('inside Purchase Action');
  // // eslint-disable-next-line no-plusplus
  // for (let i = 1; i < itemQty + 1; i++) {
  //   itemQtyRange.push(<Option key={i}>{i}</Option>);
  // }
  // eslint-disable-next-line react/prop-types
  const { updateHomeBalance } = props;
  // console.log('propssss', updateHomeBalance);
  const [balance, setBalance] = useState(null);
  const onFinish = async (formData) => {
    // console.log('Success:', formData);

    try {
      const { data } = await addBalance(1, formData);
      setBalance(data.newBalance);
      updateHomeBalance();
      console.log('Topup  balance, ', balance);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Card Number"
          name="cardNumber"
          rules={[
            {
              required: true,
              pattern: new RegExp(/^[1-9]\d*$/, 'g'),
              message: 'Please input your card number!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              pattern: new RegExp(/^[1-9]\d*$/, 'g'),
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              message: 'Please input your amount to add!',
            },
          ]}
        >
          <InputNumber
            min={0}
            style={{
              width: '100%',
            }}
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <h2>Your new balance is: {balance}</h2>
    </>
  );
}
