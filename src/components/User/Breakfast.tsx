import React, { useState } from "react";
import { Card, Row, Col, Button, InputNumber } from "antd";
const { Meta } = Card;
const Breakfast: React.FC = () => {
  const cardData = [
    {
      title: "IDLI",
      description: "Soft spongy Idlis.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHoZlJ_eg_uc_lE5JKVSunYv4akUHynoEbJA&s",
      price: 50,
    },
    {
      title: "DOSA",
      description: "Cheesy and delicious crispy dosa",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7P9-ECimzMDQMWGiu2XnSWErvEqRmz5rTaw&s",
      price: 50,
    },
    {
      title: "UPMA",
      description: "Juicy and tasty upma.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR62An25qATwuE83QS6U4uid1_fK5kigq9gMQ&s",
      price: 50,
    },
    {
      title: "POHA",
      description: "tasty vegetable poha ",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwFMemaP9noWbREaCxwbzV08NX3Sq36bGj5w&s",
      price: 50,
    },
    {
      title: "SAND-WICH",
      description: "tasty vegetable sandwich ",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_StpqnWoNp9FFQ2hx3lP8UN1zKTAaqVsN3A&s",
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
          src="https://images5.alphacoders.com/134/1340587.png"
          alt="Morning"
          style={{ maxWidth: "50%", height: "50%", borderRadius: "10px" }}
        />
        <h2 style={{ marginTop: "20px" }}>
          Start Your Day with a Delicious Breakfast!
        </h2>
        <p>Order your favorite morning dishes to kickstart your day.</p>
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
export default Breakfast;
