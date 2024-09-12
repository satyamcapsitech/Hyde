import React, { useState } from "react";
import { Card, Row, Col, Button, InputNumber } from "antd";
const { Meta } = Card;
const Lunch: React.FC = () => {
  const cardData = [
    {
      title: "Special Thali",
      description: "Delicious instant thali.",
      image:
        "https://5.imimg.com/data5/HU/PG/OE/SELLER-9770898/special-veg-thali-500x500.jpg",
        price: 50,
    },
    {
      title: "Normal thali",
      description: "Cheesy and delicious thali.",
      image:
        "https://storage.googleapis.com/shy-pub/28945/1656000225783_SKU-0108_0.JPG",
        price: 50,
    },
    {
      title: "Rice thali",
      description: "Juicy and tasty thali.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUUKzvoFerUtF5hnre7SIYE7VEPuGyNTyPoQ&s",
        price: 50,
    },
    {
      title: "Roti thali",
      description: "tasty vegetable thali ",
      image:
        "https://www.chefkunalkapur.com/wp-content/uploads/2021/03/veg-chowmein-min-scaled.jpg?v=1620296035",
        price: 50,
    },
    {
      title: "Poori-thali",
      description: "tasty vegetable thali ",
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
    <>
      <div style={{ textAlign: "center", padding: "50px" }}>
        <img
          src="https://img.freepik.com/free-photo/freshness-spice-plate-gourmet-indian-meal-generated-by-artificial-intelligence_188544-124581.jpg"
          alt="Lunch"
          style={{ maxWidth: "80%", height: "50%", borderRadius: "10px" }}
        />
        <h2 style={{ marginTop: "20px" }}>Your After noon with hearty lunch</h2>
        <p>
          Order now and enjoy your delicious lunch that keeps you going through
          the day.
        </p>
      </div>
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
    </>
  );
};
export default Lunch;
