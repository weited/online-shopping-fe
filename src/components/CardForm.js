import React from 'react';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

export default function CardForm() {
  const itemQtyRange = [];
  const itemQty = 2;
  console.log('inside Purchase Action');
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < itemQty + 1; i++) {
    itemQtyRange.push(<Option key={i}>{i}</Option>);
  }
  // const onFinish = (values) => {
  //   console.log('Success:', values);
  // };

  // const onFinishFailed = (errorInfo) => {
  //   console.log('Failed:', errorInfo);
  // };

  return (
    <>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input defaultValue="aaaaaa" disabled />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
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
    </>
  );
}
