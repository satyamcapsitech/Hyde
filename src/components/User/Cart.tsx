import React, { useState, useEffect } from 'react';
import { Table, Button, InputNumber } from 'antd';
interface CartItem {
  key: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}
const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      key: '1',
      name: 'Item 1',
      price: 100,
      quantity: 2,
      total: 200,
    },
    {
      key: '2',
      name: 'Item 2',
      price: 150,
      quantity: 1,
      total: 150,
    },
  ]);
 
  const getTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.total, 0);
  };

  const handleQuantityChange = (value: number, key: string) => {
    const updatedCart = cartItems.map(item => {
      if (item.key === key) {
        item.quantity = value;
        item.total = value * item.price;
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `₹{price}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: number, record: CartItem) => (
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => handleQuantityChange(value as number, record.key)}
        />
      ),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (total: number) => `₹{total}`,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: CartItem) => (
        <Button onClick={() => handleRemoveItem(record.key)}>Remove</Button>
      ),
    },
  ];

  const handleRemoveItem = (key: string) => {
    const updatedCart = cartItems.filter(item => item.key !== key);
    setCartItems(updatedCart);
  };
  return (
    <div style={{ padding: '20px' }}>
      <h2>Check Cart</h2>
      <Table dataSource={cartItems} columns={columns} pagination={false} />
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <h3>Total: ₹{getTotalPrice()}</h3>
        <Button type="primary" style={{ marginTop: '10px' }}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};
export default Cart;