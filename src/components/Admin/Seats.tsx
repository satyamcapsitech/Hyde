import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table as AntTable,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Switch,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface RestaurantTable {
  id: string;
  name: string;
  seats: number;
  isAvailable: boolean;
}
const Seats: React.FC = () => {
  const [tables, setTables] = useState<RestaurantTable[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTable, setEditingTable] = useState<RestaurantTable | null>(
    null
  );
  const [form] = Form.useForm();

  const fetchTables = async () => {
    try {
      const response = await axios.get("https://localhost:7015/api/Table");
      setTables(response.data);
    } catch (error) {
      message.error("Failed to load tables");
    }
  };
  useEffect(() => {
    fetchTables();
  }, []);
  const showModal = (table?: RestaurantTable) => {
    if (table) {
      form.setFieldsValue({
        name: table.name,
        seats: table.seats,
        isAvailable: table.isAvailable,
      });
      setEditingTable(table);
    }
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingTable(null);
  };
  const handleFinish = async (values: any) => {
    const payload = {
      name: values.name,
      seats: values.seats,
      isAvailable: values.isAvailable,
    };
    try {
      if (editingTable) {
        await axios.put(
          `https://localhost:7015/api/Table/${editingTable.id}`,
          payload
        );
        message.success("Table updated successfully!");
      } else {
        await axios.post("https://localhost:7015/api/Table", payload);
        message.success("Table added successfully!");
      }
      fetchTables();
      handleCancel();
    } catch (error) {
      message.error("Failed to handle table");
    }
  };
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://localhost:7015/api/Table/${id}`);
      message.success("Table deleted successfully!");
      fetchTables();
    } catch (error) {
      message.error("Failed to delete table");
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Seats",
      dataIndex: "seats",
      key: "seats",
    },
    {
      title: "Available",
      dataIndex: "isAvailable",
      key: "isAvailable",
      render: (text: boolean) => (text ? "Yes" : "No"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: RestaurantTable) => (
        <>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
          />
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          />
        </>
      ),
    },
  ];
  return (
    <>
      <h2>Table Management</h2>
      <Button
        type="primary"
        onClick={() => showModal()}
        style={{ marginBottom: 16 }}
      >
        Add Table
      </Button>
      <AntTable columns={columns} dataSource={tables} rowKey="id" />
      <Modal
        title={editingTable ? "Edit Table" : "Add Table"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter the table name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="seats"
            label="Seats"
            rules={[
              { required: true, message: "Please enter the number of seats" },
            ]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            name="isAvailable"
            label="Available"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingTable ? "Update Table" : "Add Table"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default Seats;
