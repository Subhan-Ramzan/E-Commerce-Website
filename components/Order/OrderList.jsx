// components/OrderList.jsx
import React from 'react';
import OrderItem from './OrderItem';

const orders = [
  { id: '#FWB127364372', date: '20.12.2023', price: '$4,756', status: 'Processing' },
  { id: '#FWB125467980', date: '11.12.2023', price: '$499', status: 'Shipped / Dispatched' },
  { id: '#FWB125467981', date: '11.12.2023', price: '$1,999', status: 'Delivered' },
  { id: '#FWB127364373', date: '21.12.2023', price: '$100', status: 'Cancelled' },
];

const OrderList = () => {
  return (
    <div className="mt-6 flow-root sm:mt-8">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {orders.map((order, index) => (
          <OrderItem key={index} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderList;
