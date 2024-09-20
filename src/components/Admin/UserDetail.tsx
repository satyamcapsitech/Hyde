
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, InputNumber, message, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
interface UserDetail {
id: string;
name: string;
username: string;
password: string;
mobileNo: string;
email: string;
designation: string;
employeeId: string;
walletAmount: number;
role: string; // Include role
}
const UserDetail: React.FC = () => {
const [users, setUsers] = useState<UserDetail[]>([]);
const [isModalVisible, setIsModalVisible] = useState(false);
const [editingUser, setEditingUser] = useState<UserDetail | null>(null);
const [form] = Form.useForm();
useEffect(() => {
fetchUsers();
}, []);
const fetchUsers = async () => {
try {
const response = await axios.get("https://localhost:7015/api/UserDetail");
setUsers(response.data);
} catch (error) {
message.error("Failed to load user details");
}
};
const showModal = (user?: UserDetail) => {
if (user) {
form.setFieldsValue(user);
setEditingUser(user);
} else {
form.resetFields();
setEditingUser(null);
}
setIsModalVisible(true);
};
const handleCancel = () => {
setIsModalVisible(false);
form.resetFields();
};
const handleFinish = async (values: UserDetail) => {
const payload = {
name: values.name,
username: values.username,
password: values.password, // Include password
mobileNo: values.mobileNo,
email: values.email,
designation: values.designation,
employeeId: values.employeeId,
walletAmount: values.walletAmount,
role: values.role, // Include role
};
try {
if (editingUser) {
await axios.put(
`https://localhost:7015/api/UserDetail/${editingUser.id}`,
payload
);
message.success("User updated successfully!");
} else {
await axios.post("https://localhost:7015/api/UserDetail", payload);
message.success("User added successfully!");
}
fetchUsers();
handleCancel();
} catch (error) {
message.error("Failed to handle user details");
}
};
const handleDelete = async (id: string) => {
try {
await axios.delete(`https://localhost:7015/api/UserDetail/${id}`);
message.success("User deleted successfully!");
fetchUsers();
} catch (error) {
message.error("Failed to delete user");
}
};
const columns = [
{
title: "Name",
dataIndex: "name",
key: "name",
},
{
title: "Username",
dataIndex: "username",
key: "username",
},
{
title: "Mobile No",
dataIndex: "mobileNo",
key: "mobileNo",
},
{
title: "Email",
dataIndex: "email",
key: "email",
},
{
title: "Designation",
dataIndex: "designation",
key: "designation",
},
{
title: "Employee ID",
dataIndex: "employeeId",
key: "employeeId",
},
{
title: "Wallet Amount",
dataIndex: "walletAmount",
key: "walletAmount",
render: (walletAmount: number) => `₹${walletAmount}`,
},
{
title: "Role", // New column for Role
dataIndex: "role",
key: "role",
},
{
title: "Actions",
key: "actions",
render: (_: any, record: UserDetail) => (
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
<h2>Admin Management</h2>
<Button
type="primary"
onClick={() => showModal()}
style={{ marginBottom: 16 }}
>
Add
</Button>
<Table columns={columns} dataSource={users} rowKey="id" />
<Modal
title={editingUser ? "Edit User" : "Add User"}
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
  name="username"
  label="Username"
  rules={[{ required: true, message: "Please enter the username" }]}
>
  <Input />
</Form.Item>
<Form.Item
  name="password"
  label="Password"
  rules={[{ required: true, message: "Please enter the password" }]}
>
  <Input.Password />
</Form.Item>
<Form.Item
  name="role"
  label="Role"
  rules={[{ required: true, message: "Please select a role" }]}
>
  <Select>
    <Select.Option value="Admin">Admin</Select.Option>
    <Select.Option value="User">User</Select.Option>
  </Select>
</Form.Item>
<Form.Item
  name="mobileNo"
  label="Mobile No"
  rules={[
    { required: true, message: "Please enter the mobile number" },
  ]}
>
  <Input />
</Form.Item>
<Form.Item
  name="email"
  label="Email"
  rules={[
    { required: true, message: "Please enter the email" },
    { type: "email", message: "Please enter a valid email" },
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
<Form.Item
  name="employeeId"
  label="Employee ID"
  rules={[
    { required: true, message: "Please enter the employee ID" },
  ]}
>
  <Input />
</Form.Item>
<Form.Item
  name="walletAmount"
  label="Wallet Amount"
  rules={[
    { required: true, message: "Please enter the wallet amount" },
  ]}
>
  <InputNumber min={0} style={{ width: "100%" }} />
</Form.Item>
<Form.Item>
  <Button type="primary" htmlType="submit">
    {editingUser ? "Update User" : "Add User"}
  </Button>
</Form.Item>
</Form>
</Modal>
</>
);
};
export default UserDetail;