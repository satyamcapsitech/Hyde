import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Switch,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axios from "axios";
interface Category {
  id: string;
  category: string;
  imgLink: string;
}
const Category: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [useLink, setUseLink] = useState<boolean>(false);
  const [form] = Form.useForm();
  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("https://localhost:7015/api/Category");
      setCategories(data);
    } catch (error) {
      message.error("Failed to fetch categories");
    }
  };
  const showModal = (category?: Category) => {
    if (category) {
      form.setFieldsValue(category);
      setEditingCategory(category);
    }
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingCategory(null);
  };
  const handleFinish = async (values: any) => {
    const payload = {
      name: values.name,
      imageUrl: values.imageUrl,
    };
    try {
      if (editingCategory) {
        await axios.put(
          `https://localhost:7015/api/Category/${editingCategory.id}`,
          payload
        );

        message.success("Category updated successfully!");
      } else {
        await axios.post("https://localhost:7015/api/Category", payload);
        message.success("Category added successfully!");
      }
      fetchCategories();
      handleCancel();
    } catch (error) {
      message.error("Failed to handle category");
    }
  };
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://localhost:7015/api/Category/${id}`);
      message.success("Category deleted successfully!");
      fetchCategories();
    } catch (error) {
      message.error("Failed to delete category");
    }
  };
  const uploadProps = {
    beforeUpload: (file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        form.setFieldValue("imgLink", reader.result);
      };
      reader.readAsDataURL(file);
      return false;
    },
  };
  const columns = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl: string) => (
        <img src={imageUrl} alt="Category" style={{ width: "50px" }} />
      ),
    },
    {
      title: "Category",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Category) => (
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
      <h2>Category Management</h2>
      <Button
        type="primary"
        onClick={() => showModal()}
        style={{ marginBottom: 16 }}
      >
        Add Category
      </Button>
      <Table columns={columns} dataSource={categories} rowKey="key" />
      <Modal
        title={editingCategory ? "Edit Category" : "Add Category"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="name"
            label="Category Name"
            rules={[
              { required: true, message: "Please enter the category name" },
            ]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>

          <Form.Item label="Image Source">
            <Switch
              checked={useLink}
              onChange={(checked) => setUseLink(checked)}
              checkedChildren="Link"
              unCheckedChildren="Upload"
            />
          </Form.Item>

          {useLink ? (
            <Form.Item
              name="imageUrl"
              label="Image Link"
              rules={[
                { required: true, message: "Please enter the image link" },
              ]}
            >
              <Input placeholder="Enter image URL" />
            </Form.Item>
          ) : (
            <Form.Item
              name="imageUrl"
              label="Image Upload"
              rules={[{ required: true, message: "Please upload an image" }]}
            >
              <Upload {...uploadProps} listType="picture" maxCount={1}>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingCategory ? "Update Category" : "Add Category"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default Category;
