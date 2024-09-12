import React, { useState } from "react";
import { Card, Row, Col, Button, InputNumber } from "antd";
const { Meta } = Card;
const Starter: React.FC = () => {
  const cardData = [
    {
      title: "Starter",
      description: "Delicious instant noodles.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2eT8_EQDlxKMaKxirplYZKdG6rQxmYwJAhw&s",
        price: 50,
    },
    {
      title: "Pizza",
      description: "Cheesy and delicious pizza.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSy3mGQSelJhgejCMsr56C7euf-bucbAOvTA&s",
        price: 50,
    },
    {
      title: "Burger",
      description: "Juicy and tasty burger.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB6HVf4G6mWv50MKUq9s4QUKbzo3bH9ilSNA&s",
        price: 50,
    },
    {
      title: "chowmin",
      description: "tasty vegetable chowmin ",
      image:
        "https://www.chefkunalkapur.com/wp-content/uploads/2021/03/veg-chowmein-min-scaled.jpg?v=1620296035",
        price: 50,
    },
    {
      title: "Fried-rice",
      description: "tasty vegetable chowmin ",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrEp5Y50RpgvgZNlooh7aHP7YsYOZpMI7zgQ&s",
        price: 50,
    },
  ];
  const [quantities, setQuantities] = useState<number[]>(
    Array(cardData.length).fill(0)
  );

  const increaseQuantity = (index: number) => {
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
  };
  const decreaseQuantity = (index: number) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 0) {
      newQuantities[index] -= 1;
      setQuantities(newQuantities);
    }
  };
  return (
    <Row gutter={16} style={{ padding: "20px" }}>
      {cardData.map((card, index) => (
        <Col span={6} key={index}>
          <Card
            hoverable
            style={{ width: "80%" }}
            cover={<img alt={card.title} src={card.image} />}
          >
            <Meta title={card.title} description={card.description} />
            <div style={{ marginTop: "20px", textAlign: "center" }}>
            <p>Price: ₹{card.price}</p>
              <Button onClick={() => decreaseQuantity(index)}>-</Button>
              <InputNumber
                min={0}
                value={quantities[index]}
                style={{ margin: "0 5px", width: "40px" }}
              />
              <Button onClick={() => increaseQuantity(index)}>+</Button>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
export default Starter;
