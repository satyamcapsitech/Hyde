import React, { useState } from "react";
import { Card, Row, Col, Button, InputNumber } from "antd";
const { Meta } = Card;
const Beverage: React.FC = () => {
  const cardData = [
    {
      title: "Coke",
      description: "chilled instant coke.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3lrnBnOytLLQUuYKYIdKsqGMI-1nwXDOywQ&s",
      price: 50,
    },
    {
      title: "lime side",
      description: "Cheesy and delicious pizza.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkeQxlQC87d8GWfHn0BcF50bVPibZPR0NLfg&s",
      price: 50,
    },
    {
      title: "chai",
      description: "Juicy and tasty burger.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq3XsodCK-lNfUHuHdxGZV--0mvmUFIiaSLQ&s",
      price: 50,
    },
    {
      title: "coffee",
      description: "tasty vegetable chowmin ",
      image:
        "https://www.nescafe.com/mena/sites/default/files/2023-08/Coffee%20Types%20Banner%20Desktop.jpg",
      price: 50,
    },
    {
      title: "milk",
      description: "tasty vegetable chowmin ",
      image:
        "https://5.imimg.com/data5/HD/ZE/RJ/SELLER-23947743/pure-milk-500x500.jpg",
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
export default Beverage;
