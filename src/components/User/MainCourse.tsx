import React, { useState } from "react";
import { Card, Row, Col, Button, InputNumber } from "antd";
const { Meta } = Card;
const MainCourse: React.FC = () => {
  const cardData = [
    {
      title: "Maggi",
      description: "Delicious instant noodles.",
      image:
        "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/partridge-in-cider-with-apples-celery-dd0f3c6.jpg?quality=90&resize=556,505",
        price: 50,
    },
    {
      title: "Pizza",
      description: "Cheesy and delicious pizza.",
      image:
        "https://www.southernliving.com/thmb/XIHmbOagRrWxoOOrYnQih5VEV9A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2548301_QFSHe_646_0_0_0-fbd2a27e126942c8b33dbc3d696b0501.jpg",
         price: 50,
    },
    {
      title: "Burger",
      description: "Juicy and tasty burger.",
      image:
        "https://www.southernliving.com/thmb/QJQm4u4xFR4LjdOnfiMXGxsw8o0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ParmesanCrustedMayoChicken_TK-0172_preview-89cf3d0bdf044bbc81b29ee7f0718a1f.jpg",
        price: 50,
    },
    {
      title: "chowmin",
      description: "tasty vegetable chowmin ",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2QYKYCWqR4tdTIlAhR_l5ufoeBlB1AfWk1w&s",
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
export default MainCourse;
