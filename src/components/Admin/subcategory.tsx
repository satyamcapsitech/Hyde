
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
import { EditOutlined, DeleteOutlined, UploadOutlined } from "@ant-design/icons";
interface SubCategory {
  key: string;
  category: string;
  subCategory: string;
  imgLink: string;
}
const SubCategoryManagement: React.FC = () => {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingSubCategory, setEditingSubCategory] = useState<SubCategory | null>(null);
  const [useLink, setUseLink] = useState<boolean>(false);
  const [form] = Form.useForm();
  useEffect(() => {
    const loadSubCategories = () => {
      const existingData = localStorage.getItem("subCategories");
      if (existingData) {
        setSubCategories(JSON.parse(existingData));
      }
    };
    loadSubCategories();
  }, []);
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
  const handleFinish = (values: any) => {
    let updatedSubCategories;
    if (editingSubCategory) {
      updatedSubCategories = subCategories.map(subCategory =>
        subCategory.key === editingSubCategory.key ? { ...editingSubCategory, ...values } : subCategory
      );
      setEditingSubCategory(null);
    } else {
      values.key = (subCategories.length + 1).toString();
      updatedSubCategories = [...subCategories, values];
    }
    localStorage.setItem("subCategories", JSON.stringify(updatedSubCategories));
    setSubCategories(updatedSubCategories);
    message.success(editingSubCategory ? "Subcategory updated successfully!" : "Subcategory added successfully!");
    handleCancel();
  };
  const handleDelete = (key: string) => {
    const updatedSubCategories = subCategories.filter(subCategory => subCategory.key !== key);
    localStorage.setItem("subCategories", JSON.stringify(updatedSubCategories));
    setSubCategories(updatedSubCategories);
    message.success("Subcategory deleted successfully!");
  };
  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Subcategory",
      dataIndex: "subCategory",
      key: "subCategory",
    },
    {
      title: "Image",
      dataIndex: "imgLink",
      key: "imgLink",
      render: (imgLink: string) => <img src={imgLink} alt="Subcategory" style={{ width: "100px" }} />,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: SubCategory) => (
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
     <h2>Sub category</h2>
      <Button type="primary" onClick={() => showModal()} style={{ marginBottom: 16 }}>
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
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select>
              <Select.Option value="BreakFast">BreakFast</Select.Option>
              <Select.Option value="Lunch">Lunch</Select.Option>
              <Select.Option value="Dinner">Dinner</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="subCategory"
            label="Subcategory"
            rules={[{ required: true, message: "Please enter a subcategory" }]}
          >
            <Input />
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
              {editingSubCategory ? "Update Subcategory" : "Add Subcategory"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default SubCategoryManagement;







