
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table as AntTable,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Space
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
interface Order {
  id: string;
  items: { itemName: string; quantity: number; price: number }[];
  customerName: string;
  customerId: string;
  totalAmount: number; 
}
interface Item {
  id: string;
  name: string;
  price: number;
}
const Order: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [form] = Form.useForm();
  const [selectedItems, setSelectedItems] = useState<{ itemName: string; quantity: number; price: number }[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0); 
  const fetchOrders = async () => {
    try {
      const response = await axios.get("https://localhost:7015/api/Order");
      setOrders(response.data);
    } catch (error) {
      message.error("Failed to load orders");
    }
  };
  const fetchItems = async () => {
    try {
      const { data } = await axios.get("https://localhost:7015/api/Item");
      const availableItems = data.filter((item: { stock: boolean }) => item.stock);
      setItems(availableItems);
    } catch (error) {
      message.error("Failed to fetch items");
    }
  };
  useEffect(() => {
    fetchOrders();
    fetchItems();
  }, []);
  const showModal = (order?: Order) => {
    if (order) {
      form.setFieldsValue({
        customerName: order.customerName,
        customerId: order.customerId,
      });
      setSelectedItems(order.items);
      setTotalPrice(calculateTotalPrice(order.items)); 
      setEditingOrder(order);
    }
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setSelectedItems([]);
    setEditingOrder(null);
    setTotalPrice(0);
  };
  const addItem = () => {
    setSelectedItems([...selectedItems, { itemName: "", quantity: 1, price: 0 }]);
  };
  const removeItem = (index: number) => {
    const newItems = [...selectedItems];
    newItems.splice(index, 1);
    setSelectedItems(newItems);
    setTotalPrice(calculateTotalPrice(newItems)); 
  };
  const handleFinish = async (values: any) => {
    if(selectedItems.length==0){
      message.error("selelct at least one-item")
      return;
    }
    const payload = {
      items: selectedItems,
      customerName: values.customerName,
      customerId: values.customerId,
      totalAmount: totalPrice,
    };
    try {
      if (editingOrder) {
        await axios.put(
          `https://localhost:7015/api/Order/${editingOrder.id}`,
          payload
        );
        message.success("Order updated successfully!");
      } else {
        await axios.post("https://localhost:7015/api/Order", payload);
        message.success("Order added successfully!");
      }
      fetchOrders();
      handleCancel();
    } catch (error) {
      message.error("Failed to handle order");
    }
  };
  const handleItemChange = (value: string, index: number, field: "itemName" | "quantity") => {
    const newItems = [...selectedItems];
    if (field === "itemName") {
      const selectedItem = items.find((item) => item.name === value);
      if (selectedItem) {
        newItems[index] = { ...newItems[index], itemName: value, price: selectedItem.price };
      }
    } else {
      newItems[index] = { ...newItems[index], [field]: value };
    }
    setSelectedItems(newItems);
    setTotalPrice(calculateTotalPrice(newItems)); 
  };
  
  const calculateTotalPrice = (items: { quantity: number; price: number }[]) => {
    return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://localhost:7015/api/Order/${id}`);
      message.success("Order deleted successfully!");
      fetchOrders();
    } catch (error) {
      message.error("Failed to delete order");
    }
  };

  const columns = [
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items: { itemName: string; quantity: number; price: number }[]) =>
        items.map((item) => `${item.itemName} (x${item.quantity}) - ₹${item.price}`).join(", "),
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Customer ID",
      dataIndex: "customerId",
      key: "customerId",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount: number) => `₹${totalAmount.toFixed(2)}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Order) => (
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
      <h2>Order Management</h2>
      <Button
        type="primary"
        onClick={() => showModal()}
        style={{ marginBottom: 16 }}
      >
        Add Order
      </Button>
      <AntTable columns={columns} dataSource={orders} rowKey="id" />
      <Modal
        title={editingOrder ? "Edit Order" : "Add Order"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          {selectedItems.map((item, index) => (
            <Space key={index} style={{ display: 'flex', marginBottom: 8 }} align="start">
              <Form.Item
                label="Item Name"
                rules={[{ required: true, message: "Please select an item" }]}
                style={{height:80}}
              >
                <Select
                  value={item.itemName}
                  placeholder="Select an item"
                  onChange={(value) => handleItemChange(value, index, "itemName")}
                >
                  {items.map((availableItem) => (
                    <Select.Option key={availableItem.id} value={availableItem.name}>
                      {availableItem.name} - ₹{availableItem.price}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Quantity"
                rules={[{ required: true, message: "Please enter the quantity" }]}
              >
                <InputNumber
                  min={1}
                  value={item.quantity}
                  onChange={(value) => handleItemChange(value, index, "quantity")}
                />
              </Form.Item>
              <Button type="link" danger onClick={() => removeItem(index)}>
                Remove
              </Button>
            </Space>
          ))}
          <Button type="dashed" onClick={addItem} style={{ marginBottom: 16 }}aria-required>
            Add Item
          </Button>
          <Form.Item
            name="customerName"
            label="Customer Name"
            rules={[{ required: true, message: "Please enter the customer name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="customerId"
            label="Customer ID"
            rules={[{ required: true, message: "Please enter the customer ID" }]}
          >
            <Input />
          </Form.Item>
          <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3> {/* Display total price */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingOrder ? "Update Order" : "Add Order"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default Order;














