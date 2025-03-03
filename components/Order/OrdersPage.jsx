"use client";
import React, { useEffect, useState } from 'react';
import OrderFilter from './OrderFilter';
import Pagination from './Pagination';
import OrderList from './OrderList';
import { Loader2 } from 'lucide-react';
import { API_URL } from '@/utils/urls';

const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN; 

const OrdersPage = ({ userEmail }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching orders for userEmail:", userEmail); // Debugging
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/orders?userEmail=${userEmail}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${STRAPI_API_TOKEN}`, // Add Bearer token here
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        console.log("Orders fetched:", data); // Debugging
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error); // Debugging
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [userEmail]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <p className="ml-2">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <OrderFilter />
          <OrderList orders={orders} />
          <Pagination totalPages={Math.ceil(orders.length / 10)} />
        </div>
      </div>
    </section>
  );
};

export default OrdersPage;