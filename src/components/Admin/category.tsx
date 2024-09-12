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
import { EditOutlined, DeleteOutlined, UploadOutlined } from "@ant-design/icons";
interface Category {
  key: string;
  category: string;
  imgLink: string;
}
const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [useLink, setUseLink] = useState<boolean>(false);
  const [form] = Form.useForm();
  useEffect(() => {
    const loadCategories = () => {
      const existingData = localStorage.getItem("categories");
      if (existingData) {
        setCategories(JSON.parse(existingData));
      }
    };
    loadCategories();
  }, []);
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
  const handleFinish = (values: any) => {
    let updatedCategories;
    if (editingCategory) {
      updatedCategories = categories.map(category =>
        category.key === editingCategory.key ? { ...editingCategory, ...values } : category
      );
      setEditingCategory(null);
    } else {
      values.key = (categories.length + 1).toString();
      updatedCategories = [...categories, values];
    }
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    setCategories(updatedCategories);
    message.success(editingCategory ? "Category updated successfully!" : "Category added successfully!");
    handleCancel();
  };
  const handleDelete = (key: string) => {
    const updatedCategories = categories.filter(category => category.key !== key);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    setCategories(updatedCategories);
    message.success("Category deleted successfully!");
  };
  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Image",
      dataIndex: "imgLink",
      key: "imgLink",
      render: (imgLink: string) => <img src={imgLink} alt="Category" style={{ width: "100px" }} />,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Category) => (
        <>
          <Button type="link" icon={<EditOutlined />} onClick={() => showModal(record)} />
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)} />
        </>
      ),
    },
  ];
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
  return (
    <>
      <Button type="primary" onClick={() => showModal()} style={{ marginBottom: 16 }}>
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
            name="category"
            label="Category Name"
            rules={[{ required: true, message: "Please enter the category name" }]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>
          {/* Image Source Toggle */}
          <Form.Item label="Image Source">
            <Switch
              checked={useLink}
              onChange={(checked) => setUseLink(checked)}
              checkedChildren="Link"
              unCheckedChildren="Upload"
            />
          </Form.Item>
          {/* Conditionally Render Image Link or Upload */}
          {useLink ? (
            <Form.Item
              name="imgLink"
              label="Image Link"
              rules={[{ required: true, message: "Please enter the image link" }]}
            >
              <Input placeholder="Enter image URL" />
            </Form.Item>
          ) : (
            <Form.Item
              name="imgLink"
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
export default CategoryManagement;