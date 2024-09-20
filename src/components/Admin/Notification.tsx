import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, DatePicker, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";

interface Notification {
  id: string;
  message: string;
  time: string;
}
const Notification: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingNotification, setEditingNotification] =
    useState<Notification | null>(null);
  const [form] = Form.useForm();

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7015/api/Notification"
      );
      setNotifications(response.data);
    } catch (error) {
      message.error("Failed to load notifications");
    }
  };
  useEffect(() => {
    fetchNotifications();
  }, []);
  const showModal = (notification?: Notification) => {
    if (notification) {
      form.setFieldsValue({
        message: notification.message,
        time: moment(notification.time),
      });
      setEditingNotification(notification);
    }
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingNotification(null);
  };
  const handleFinish = async (values: any) => {
    const payload = {
      message: values.message,
      time: values.time.toISOString(),
    };
    try {
      if (editingNotification) {
        await axios.put(
          `https://localhost:7015/api/Notification/${editingNotification.id}`,
          payload
        );
        message.success("Notification updated successfully!");
      } else {
        await axios.post("https://localhost:7015/api/Notification", payload);
        message.success("Notification added successfully!");
      }
      fetchNotifications();
      handleCancel();
    } catch (error) {
      message.error("Failed to handle notification");
    }
  };
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://localhost:7015/api/Notification/${id}`);
      message.success("Notification deleted successfully!");
      fetchNotifications();
    } catch (error) {
      message.error("Failed to delete notification");
    }
  };
  const columns = [
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (text: string) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Notification) => (
        <>
          {/* <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
          /> */}
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
      <h2>Notifications Management</h2>
      <Button
        type="primary"
        onClick={() => showModal()}
        style={{ marginBottom: 16 }}
      >
        Add Notification
      </Button>
      <Table columns={columns} dataSource={notifications} rowKey="id" />
      <Modal
        title={editingNotification ? "Edit Notification" : "Add Notification"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true, message: "Please enter the message" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="time"
            label="Time"
            rules={[{ required: true, message: "Please select the time" }]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingNotification ? "Update Notification" : "Add Notification"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default Notification;
