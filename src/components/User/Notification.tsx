import React, { useState, useEffect } from "react";
import axios from "axios";
import { List, Card, message } from "antd";
import moment from "moment";
interface Notification {
  id: string;
  message: string;
  time: string;
}
const Notification: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
 
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7015/api/Notification"
      );
      setNotifications(response.data);
    } catch (error) {
      message.error("Failed to load notifications");
    }
  };
  useEffect(() => {
    fetchNotifications();
  }, []);
  return (
    <div style={{ padding: "20px" }}>
      <h2>Notifications</h2>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={notifications}
        renderItem={(notification) => (
          <List.Item>
            <Card title={notification.message}>
              <p>
                <strong>Time: </strong>
                {moment(notification.time).format("YYYY-MM-DD HH:mm:ss")}
              </p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
export default Notification;






