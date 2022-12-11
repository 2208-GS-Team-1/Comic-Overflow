import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import UserOrdersDetails from "./UserOrdersDetails";

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
      <h2>Past Orders</h2>
      {orders.map((order) => (
        <div key={order.id}>
          Summary: <div>Total Price: ${(order.price / 100).toFixed(2)}</div>
          <div>Delivery Status: {order.orderStatus}</div>
          <div>Date Ordered: {order.createdAt.split("T")[0]}</div>
          <div>Order ID: {order.id}</div>
          Details:
          <div>
            {order.cartItems.map((cartItem) => {
              return (
                <UserOrdersDetails key={cartItem.id} cartItem={cartItem} />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserOrders;
