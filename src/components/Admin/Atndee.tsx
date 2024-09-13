import React, { useState, useEffect } from "react";
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
  key: string;
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
  useEffect(() => {
    const loadAttendees = () => {
      const existingData = localStorage.getItem("attendees");
      if (existingData) {
        setAttendees(JSON.parse(existingData));
      }
    };
    loadAttendees();
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
  const handleFinish = (values: any) => {
    let updatedAttendees;
    if (editingAttendee) {
      updatedAttendees = attendees.map((attendee) =>
        attendee.key === editingAttendee.key
          ? { ...editingAttendee, ...values }
          : attendee
      );
      setEditingAttendee(null);
    } else {
      values.key = (attendees.length + 1).toString();
      updatedAttendees = [...attendees, values];
    }
    localStorage.setItem("attendees", JSON.stringify(updatedAttendees));
    setAttendees(updatedAttendees);
    message.success(
      editingAttendee
        ? "Attendee updated successfully!"
        : "Attendee added successfully!"
    );
    handleCancel();
  };
  const handleDelete = (key: string) => {
    const updatedAttendees = attendees.filter(
      (attendee) => attendee.key !== key
    );
    localStorage.setItem("attendees", JSON.stringify(updatedAttendees));
    setAttendees(updatedAttendees);
    message.success("Attendee deleted successfully!");
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
      title: "gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "ID Card No.",
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
            onClick={() => handleDelete(record.key)}
          />
        </>
      ),
    },
  ];
  return (
    <>
     <h2>Atndee</h2>
      <Button
        type="primary"
        onClick={() => showModal()}
        style={{ marginBottom: 16 }}
      >
        Add Staff
      </Button>
      <Table columns={columns} dataSource={attendees} rowKey="key" />
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
            label="gender"
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
