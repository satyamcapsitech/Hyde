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
interface Item {
  key: string;
  itemName: string;
  category: string;
  subCategory: string;
  price: number;
  stock: boolean;
  imgLink: string;
}
const ItemManagement: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [useLink, setUseLink] = useState<boolean>(false);
  const [form] = Form.useForm();
  useEffect(() => {
    const loadItems = () => {
      const existingData = localStorage.getItem("items");
      if (existingData) {
        setItems(JSON.parse(existingData));
      }
    };
    loadItems();
  }, []);
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
  const handleFinish = (values: any) => {
    let updatedItems;
    if (editingItem) {
      updatedItems = items.map((item) =>
        item.key === editingItem.key ? { ...editingItem, ...values } : item
      );
      setEditingItem(null);
    } else {
      values.key = (items.length + 1).toString();
      updatedItems = [...items, values];
    }
    localStorage.setItem("items", JSON.stringify(updatedItems));
    setItems(updatedItems);
    message.success(
      editingItem ? "Item updated successfully!" : "Item added successfully!"
    );
    handleCancel();
  };
  const handleDelete = (key: string) => {
    const updatedItems = items.filter((item) => item.key !== key);
    localStorage.setItem("items", JSON.stringify(updatedItems));
    setItems(updatedItems);
    message.success("Item deleted successfully!");
  };
  const columns = [
    {
      title: "Item Name",
      dataIndex: "itemName",
      key: "itemName",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Sub Category",
      dataIndex: "subCategory",
      key: "subCategory",
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
      title: "Image",
      dataIndex: "imgLink",
      key: "imgLink",
      render: (imgLink: string) => (
        <img src={imgLink} alt="Item" style={{ width: "100px" }} />
      ),
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
            onClick={() => handleDelete(record.key)}
          />
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
     <h2>Items</h2>
      <Button
        type="primary"
        onClick={() => showModal()}
        style={{ marginBottom: 16 }}
      >
        Add Item
      </Button>
      <Table columns={columns} dataSource={items} rowKey="key" />
      <Modal
        title={editingItem ? "Edit Item" : "Add Item"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="itemName"
            label="Item Name"
            rules={[{ required: true, message: "Please enter the item name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select the category" }]}
          >
            <Select>
              <Select.Option value="Breakfast">Breakfast</Select.Option>
              <Select.Option value="Lunch">Lunch</Select.Option>
              <Select.Option value="Dinner">Dinner</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="subCategory"
            label="Sub Category"
            rules={[
              { required: true, message: "Please select the subcategory" },
            ]}
          >
            <Select>
              <Select.Option value="Dosa">Dosa</Select.Option>
              <Select.Option value="Paratha">Paratha</Select.Option>
              <Select.Option value="Thalis">Thalis</Select.Option>
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
              rules={[
                { required: true, message: "Please enter the image link" },
              ]}
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
              {editingItem ? "Update Item" : "Add Item"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ItemManagement;
