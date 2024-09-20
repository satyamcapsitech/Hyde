import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
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
interface SubCategory {
  id: string;
  categoryId: string;
  name: string;
  imageUrl: string;
}
interface Category {
  id: string;
  name: string;
}
const SubCategoryManagement: React.FC = () => {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingSubCategory, setEditingSubCategory] =
    useState<SubCategory | null>(null);
  const [useLink, setUseLink] = useState<boolean>(false);
  const [form] = Form.useForm();
  useEffect(() => {
    loadSubCategories();
    loadCategories();
  }, []);
  const loadSubCategories = async () => {
    try {
      const { data } = await axios.get(
        "https://localhost:7015/api/Subcategories"
      );
      setSubCategories(data);
    } catch (error) {
      message.error("Failed to fetch subcategories");
    }
  };
  const loadCategories = async () => {
    try {
      const { data } = await axios.get("https://localhost:7015/api/Category");
      setCategories(data);
    } catch (error) {
      message.error("Failed to fetch categories");
    }
  };
  const showModal = (subCategory?: SubCategory) => {
    if (subCategory) {
      form.setFieldsValue(subCategory);
      setEditingSubCategory(subCategory);
    }
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingSubCategory(null);
  };
  const handleFinish = async (values: any) => {
    const payload = {
      name: values.name,
      categoryId: values.categoryId,
      imageUrl: values.imageUrl,
    };
    try {
      if (editingSubCategory) {
        await axios.put(
          `https://localhost:7015/api/Subcategories/${editingSubCategory.id}`,
          payload
        );
        message.success("Subcategory updated successfully!");
      } else {
        await axios.post("https://localhost:7015/api/Subcategories", payload);
        message.success("Subcategory added successfully!");
      }
      loadSubCategories();
      handleCancel();
    } catch (error) {
      message.error("Failed to handle subcategory");
    }
  };
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://localhost:7015/api/Subcategories/${id}`);
      message.success("Subcategory deleted successfully!");
      loadSubCategories();
    } catch (error) {
      message.error("Failed to delete subcategory");
    }
  };
  const uploadProps = {
    beforeUpload: (file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        form.setFieldValue("imageUrl", reader.result);
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
        <img src={imageUrl} alt="Subcategory" style={{ width: "50px" }} />
      ),
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (categoryId: string) =>
        categories.find((cat) => cat.id === categoryId)?.name || "Unknown",
    },
    {
      title: "Subcategory",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: SubCategory) => (
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
      <h2>Subcategory Management</h2>
      <Button
        type="primary"
        onClick={() => showModal()}
        style={{ marginBottom: 16 }}
      >
        Add Subcategory
      </Button>
      <Table columns={columns} dataSource={subCategories} rowKey="key" />
      <Modal
        title={editingSubCategory ? "Edit Subcategory" : "Add Subcategory"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="categoryId"
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select>
              {categories.map((category) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="name"
            label="Subcategory"
            rules={[{ required: true, message: "Please enter a subcategory" }]}
          >
            <Input placeholder="Enter subcategory name" />
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
              {editingSubCategory ? "Update Subcategory" : "Add Subcategory"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default SubCategoryManagement;
