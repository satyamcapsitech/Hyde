import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Segmented,
} from "antd";
import type { FormProps } from "antd";

const {RangePicker} = DatePicker;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const Userdetail: React.FC = () => {
  const [componentVariant, setComponentVariant] =
    useState<FormProps["variant"]>("filled");

  const onFormVariantChange = ({
    variant,
  }: {
    variant: FormProps["variant"];
  }) => {
    setComponentVariant(variant);
  };
  return (
    <>
      <div className="i">
        <Form
          {...formItemLayout}
          onValuesChange={onFormVariantChange}
          variant={componentVariant}
          style={{ maxWidth: 600 }}
          initialValues={{ variant: componentVariant }}
        >
          <Form.Item label="Form variant" name="variant">
            <Segmented options={["outlined", "filled", "borderless"]} />
          </Form.Item>

          <Form.Item
            label="Name"
            name="Input"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="create userName"
            name="Input2"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label=" Generate Password"
            name="Input3"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mobile no"
            name="InputNumber"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Address"
            name="TextArea"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Id card no"
            name="Mentions"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Mentions />
          </Form.Item>

          <Form.Item
            label="Designation"
            name="Input4"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

        
      </div>
    </>
  );
};

export default Userdetail;
