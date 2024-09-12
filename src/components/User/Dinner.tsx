
import { Card, Row, Col, Button, InputNumber } from "antd";
const { Meta } = Card;
import React, { useState } from "react";
interface CardData {
  title: string;
  description: string;
  image: string;
  price: number;
}
const Dinner: React.FC = () => {
  const cardData: CardData[] = [
    {
      title: "Maggi",
      description: "Delicious instant noodles.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaQacTe0c6xpJBzWveojzgGz3aMxibXVMvVg&s",
      price: 50,
    },
    {
      title: "Pizza",
      description: "Cheesy and delicious pizza.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3RhAkXrDXaU8_tVgEFovixM6eCSLN3CJl5Q&s",
      price: 120,
    },
    {
      title: "Burger",
      description: "Juicy and tasty burger.",
      image:
        "https://static.vecteezy.com/system/resources/previews/019/023/604/non_2x/front-view-tasty-meat-burger-with-cheese-and-salad-free-photo.jpg",
      price: 90,
    },
    {
      title: "Chowmin",
      description: "Tasty vegetable chowmin.",
      image:
        "https://www.chefkunalkapur.com/wp-content/uploads/2021/03/veg-chowmein-min-scaled.jpg?v=1620296035",
      price: 70,
    },
    {
      title: "Fried Rice",
      description: "Tasty vegetable fried rice.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrEp5Y50RpgvgZNlooh7aHP7YsYOZpMI7zgQ&s",
      price: 85,
    },
  ];
  const [quantities, setQuantities] = useState<number[]>(
    Array(cardData.length).fill(0)
  );

  const [totalPrice, setTotalPrice] = useState<number>(0);

  const increaseQuantity = (index: number) => {
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
    setTotalPrice(totalPrice + cardData[index].price);
  };
  const decreaseQuantity = (index: number) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 0) {
      newQuantities[index] -= 1;
      setQuantities(newQuantities);
      setTotalPrice(totalPrice - cardData[index].price);
    }
  };
  return (
    <>
      <div style={{ textAlign: "center", padding: "50px" }}>
        <img
          src="https://static.vecteezy.com/system/resources/previews/033/737/235/non_2x/a-table-with-food-and-wine-on-it-ai-generated-free-photo.jpg"
          alt="Dinner"
          style={{ maxWidth: "50%", height: "50%", borderRadius: "10px" }}
        />
        <h2 style={{ marginTop: "20px" }}>
          A Desert to Fulfill Your Last Meal
        </h2>
        <p>
          End your day with a mouth-watering meal and go for a relaxed sleep.
          Our dinner table is awaiting your pleasure.
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
                  readOnly
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
export default Dinner;
