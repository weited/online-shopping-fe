/* eslint-disable prefer-regex-literals */
import React, { useState } from 'react';
import { Form, Input, Button, InputNumber, Alert } from 'antd';
import { addBalance } from '../services/UserApi';

export default function CardTopup(props) {
  // eslint-disable-next-line react/prop-types
  const { updateHomeBalance } = props;
  const [balance, setBalance] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const onFinish = async (formData) => {
    try {
      const { data } = await addBalance(1, formData);
      setBalance(data.newBalance);
      updateHomeBalance();
    } catch (error) {
      setErrorMsg(error.response.data.error);
      setTimeout(() => setErrorMsg(null), 3000);
    }
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
        autoComplete="off"
      >
        <Form.Item
          label="Card Number"
          name="cardNum"
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
          name="cardPin"
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
      {errorMsg && <Alert message={errorMsg} type="error" />}
      <h2>Your new balance is: {balance}</h2>
    </>
  );
}
