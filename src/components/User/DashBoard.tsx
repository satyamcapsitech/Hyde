import React, { useState } from "react";
import { Card, Col, Row, Image } from "antd";
import Breakfast from "./Breakfast";
import Lunch from "./Lunch";
import Dinner from "./Dinner";

const DashBoard: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const renderContent = () => {
    switch (selectedMenu) {
      case "breakfast":
        return <Breakfast />;
      case "lunch":
        return <Lunch />;
      case "dinner":
        return <Dinner />;
      default:
        return (
          <div style={{ textAlign: "center" }}>
            {
              <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5FHLAPmoXO1LOBUitlxplL19fFrmJea5UZA&s"></Image>
            }
          </div>
        );
    }
  };
  return (
    <>
      <div style={{ padding: "30px" }}>
        <Row gutter={[16, 16]} justify="center">
          <Col span={6}>
            <Card
              hoverable
              onClick={() => setSelectedMenu("breakfast")}
              cover={
                <Image src="https://media.istockphoto.com/id/518593585/photo/cup-of-coffee.jpg?s=612x612&w=0&k=20&c=TyosoZUHEeE48CbEWKoL4ff4PS1ebcy8j0HnRWieGXQ="></Image>
              }
              style={{ textAlign: "center", height: "100%" }}
            >
              <h2>Breakfast</h2>
              <p>Start your day with a delicious meal</p>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              hoverable
              onClick={() => setSelectedMenu("lunch")}
              cover={
                <Image src="https://www.shutterstock.com/image-photo/delicious-omelette-chopped-parsley-on-260nw-2004024764.jpg"></Image>
              }
              style={{ textAlign: "center", height: "100%" }}
            >
              <h2>Lunch</h2>
              <p>Fuel your afternoon with a hearty meal</p>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              hoverable
              onClick={() => setSelectedMenu("dinner")}
              cover={
                <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYCQPJroQfIiGJzdCJ3sQOqrq-HoQbnWHQ8g&s"></Image>
              }
              style={{ textAlign: "center", height: "100%" }}
            >
              <h2>Dinner</h2>
              <p>End your day with a delightful dinner</p>
            </Card>
          </Col>
        </Row>
        <div style={{ marginTop: "30px" }}>{renderContent()}</div>
      </div>
    </>
  );
};
export default DashBoard;
