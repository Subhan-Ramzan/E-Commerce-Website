// components/OrdersPage.jsx
import React from 'react';
import OrderFilter from './OrderFilter';
import Pagination from './Pagination';
import OrderList from './OrderList';

const OrdersPage = () => {
  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <OrderFilter />
          <OrderList />
          <Pagination />
        </div>
      </div>
    </section>
  );
};

export default OrdersPage;