import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const UserOrders = () => {
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      //GET all orders associated with user
      const ordersData = await axios.get(`/api/orders/users/${user.id}`);
      console.log(ordersData.data);
      setOrders(ordersData.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      Past Orders
      {orders.map((order) => (
        <div key={order.id}>
          Summary: <div>Total Price: ${order.price}</div>
          <div>Delivery Status: {order.orderStatus}</div>
          <div>Date Ordered: {order.createdAt.split("T")[0]}</div>
        </div>
      ))}
    </div>
  );
};

export default UserOrders;
