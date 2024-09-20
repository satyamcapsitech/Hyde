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
  Upload,
  Select,
  Switch,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axios from "axios";
interface Item {
  id: string;
  name: string;
  categoryId: string;
  subCategoryId: string;
  price: number;
  stock: boolean;
  imageUrl: string;
}
interface Category {
  id: string;
  name: string;
}
const ItemManagement: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [useLink, setUseLink] = useState<boolean>(false);
  const [form] = Form.useForm();
  useEffect(() => {
    fetchItems();
    fetchCategories();
    // fetchsubCategories();
    fetchAllsubCategories();
  }, []);

  const fetchItems = async () => {
    try {
      const { data } = await axios.get("https://localhost:7015/api/Item");

      setItems(data);
    } catch (error) {
      message.error("Failed to fetch items");
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("https://localhost:7015/api/Category");
      setCategories(data);
    } catch (error) {
      message.error("Failed to fetch categories");
    }
  };

  const fetchsubCategories = async (categoryId: string) => {
    try {
      const { data } = await axios.get(
        `https://localhost:7015/api/Subcategories/category/${categoryId}`
      );
      setSubCategories(data);
    } catch (error) {
      message.error("Failed to fetch sub-categories");
    }
  };
  const fetchAllsubCategories = async () => {
    try {
      const { data} = await axios.get(
        `https://localhost:7015/api/Subcategories`
      );
      setSubCategories(data);
    } catch (error) {
      message.error("Failed to fetch sub-categories");
    }
  };
  const showModal = (item?: Item) => {
    if (item) {
      form.setFieldsValue(item);
      setEditingItem(item);
    }
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingItem(null);
  };
  const handleFinish = async (values: any) => {
    const payload = {
      name: values.name,
      categoryId: values.categoryId,
      subCategoryId: values.subCategoryId,
      price: values.price,
      stock: values.stock,
      imageUrl: values.imageUrl,
    };
    try {
      if (editingItem) {
        await axios.put(
          `https://localhost:7015/api/Item/${editingItem.id}`,
          payload
        );
        message.success("Item updated successfully!");
      } else {
        await axios.post("https://localhost:7015/api/Item", payload);
        message.success("Item added successfully!");
      }
      fetchItems();
      handleCancel();
    } catch (error) {
      message.error("Failed to handle item");
    }
  };
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://localhost:7015/api/Item/${id}`);
      message.success("Item deleted successfully!");
      fetchItems();
    } catch (error) {
      message.error("Failed to delete item");
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
        <img src={imageUrl} alt="Item" style={{ width: "50px" }} />
      ),
    },
    {
      title: "Item Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (categoryId: string) =>
        categories.find((cat) => cat.id === categoryId)?.name || "N/A",
    },
    {
      title: "Sub Category",
      dataIndex: "subCategoryId",
      key: "subCategoryId",
      render: (subCategoryId: string) =>
        subCategories.find((sub) => sub.id === subCategoryId)?.name || "N/A",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (stock: boolean) => (stock ? "Yes" : "No"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Item) => (
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
      <h2>Items Management</h2>
      <Button
        type="primary"
        onClick={() => showModal()}
        style={{ marginBottom: 16 }}
      >
        Add Item
      </Button>
      <Table columns={columns} dataSource={items} rowKey="id" />
      <Modal
        title={editingItem ? "Edit Item" : "Add Item"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="name"
            label="Item Name"
            rules={[{ required: true, message: "Please enter the item name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="categoryId"
            label="Category"
            rules={[{ required: true, message: "Please select the category" }]}
          >
            <Select
              placeholder="Select a category"
              onChange={(value) => {
                form.setFieldValue("subCategoryId", null); // Reset subcategory field
                fetchsubCategories(value); // Fetch subcategories based on selected category
              }}
            >
              {categories.map((category) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="subCategoryId"
            label="Sub Category"
            rules={[
              { required: true, message: "Please select the subcategory" },
            ]}
          >
            <Select
              placeholder="Select a subcategory"
              disabled={!form.getFieldValue("categoryId")}
            >
              {subCategories.map((subCategory) => (
                <Select.Option key={subCategory.id} value={subCategory.id}>
                  {subCategory.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              {
                required: true,
                type: "number",
                message: "Please enter the price",
              },
            ]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            name="stock"
            label="Stock"
            rules={[
              {
                required: true,
                message: "Please select the stock availability",
              },
            ]}
          >
            <Radio.Group>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
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
              {editingItem ? "Update Item" : "Add Item"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ItemManagement;
