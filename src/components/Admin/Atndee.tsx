import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Radio,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
interface Attendee {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  idCardNo: string;
  designation: string;
}
const Atndee: React.FC = () => {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAttendee, setEditingAttendee] = useState<Attendee | null>(null);
  const [form] = Form.useForm();
 
  const fetchAttendees = async () => {
    try {
      const response = await axios.get("https://localhost:7015/api/Attendees");
      setAttendees(response.data);
    } catch (error) {
      message.error("Failed to load attendees");
    }
  };
  useEffect(() => {
    fetchAttendees();
  }, []);
  const showModal = (attendee?: Attendee) => {
    if (attendee) {
      form.setFieldsValue(attendee);
      setEditingAttendee(attendee);
    }
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingAttendee(null);
  };
  const handleFinish = async (values: any) => {
    const payload = {
      id:editingAttendee?.id,
      name: values.name,
      age: values.age,
      gender: values.gender,
      idCardNo: values.idCardNo,
      designation: values.designation,
    };
    try {
      if (editingAttendee) {
       
        await axios.put(
          `https://localhost:7015/api/Attendees/${editingAttendee.id}`,
          payload
        );
        message.success("Attendee updated successfully!");
      } else {
       
        await axios.post("https://localhost:7015/api/Attendees", payload);
        message.success("Attendee added successfully!");
      }
      fetchAttendees();
      handleCancel();
    } catch (error) {
      message.error("Failed to handle attendee");
    }
  };
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://localhost:7015/api/Attendees/${id}`);
      message.success("Attendee deleted successfully!");
      fetchAttendees();
    } catch (error) {
      message.error("Failed to delete attendee");
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "ID Card No",
      dataIndex: "idCardNo",
      key: "idCardNo",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Attendee) => (
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
      <h2>Staff Management</h2>
      <Button
        type="primary"
        onClick={() => showModal()}
        style={{ marginBottom: 16 }}
      >
        Add Staff
      </Button>
      <Table columns={columns} dataSource={attendees} rowKey="id" />
      <Modal
        title={editingAttendee ? "Edit Attendee" : "Add Attendee"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[
              {
                required: true,
                type: "number",
                message: "Please enter the age",
              },
            ]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please select the gender" }]}
          >
            <Radio.Group>
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
              <Radio value="Other">Other</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="idCardNo"
            label="ID Card No."
            rules={[
              { required: true, message: "Please enter the ID card number" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="designation"
            label="Designation"
            rules={[
              { required: true, message: "Please enter the designation" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingAttendee ? "Update Attendee" : "Add Attendee"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default Atndee;