/* eslint-disable prefer-regex-literals */
/* eslint-disable camelcase */
import React from 'react';
import { Modal, Form, Input, Typography, InputNumber, Alert } from 'antd';

const { Text } = Typography;

export default function PurchaseForm({
  visible,
  onOk,
  confirmLoading,
  onCancel,
  itemBuy,
  userBal,
  errorMsg,
}) {
  const { item_id, item_name, stock_qty, price_of_unit } = itemBuy;

  const [form] = Form.useForm();
  const totalPrice = Form.useWatch('quantity', form) * price_of_unit;

  return (
    <Modal
      title="Purchase Item."
      centered
      visible={visible}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onOk(values);
          })
          .catch((info) => {
            // eslint-disable-next-line no-console
            console.log('Validate Failed:', info);
          });
      }}
      okButtonProps={{ disabled: totalPrice > userBal }}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
    >
      <Alert message={`Your balance is ${userBal}`} type="info" />

      <Form
        form={form}
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
        autoComplete="off"
      >
        <Form.Item label="ID" name="itemId">
          <Text>{item_id}</Text>
        </Form.Item>
        <Form.Item label="Item Name" name="itemName">
          <Text>{item_name}</Text>
        </Form.Item>
        <Form.Item label="Stock" name="itemId">
          <Text>{stock_qty}</Text>
        </Form.Item>
        <Form.Item label="Item Price" name="itemName">
          <Text>$ {price_of_unit}</Text>
        </Form.Item>
        <Form.Item label="Total" name="itemTotalPrice">
          <Text>$ {totalPrice}</Text>
        </Form.Item>
        <Form.Item
          label="Quantity"
          name="quantity"
          initialValue={1}
          rules={[
            {
              required: true,
              message: 'Please input quantity!',
            },
          ]}
        >
          <InputNumber min={1} max={stock_qty} />
        </Form.Item>
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
          label="Card Pin"
          name="cardPin"
          rules={[
            {
              required: true,
              pattern: new RegExp(/^[1-9]\d*$/, 'g'),
              message: 'Please input your card pin!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
      {totalPrice > userBal && (
        <Alert message="not sufficient funds" type="error" />
      )}
      {errorMsg && <Alert message={errorMsg} type="error" />}
    </Modal>
  );
}
