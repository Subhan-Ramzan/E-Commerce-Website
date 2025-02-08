// components/OrderFilter.jsx
import React from 'react';

const OrderFilter = () => {
  return (
    <div className="gap-4 sm:flex sm:items-center sm:justify-between">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">My orders</h2>

      <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
        <div>
          <label htmlFor="order-type" className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white">Select order type</label>
          <select
            id="order-type"
            defaultValue="All orders" // Use defaultValue instead of selected
            className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
          >
            <option value="All orders">All orders</option>
            <option value="processing">Processing</option>
            <option value="Shippied">Shipped / Dispatched</option>
            <option value="Deliverd">Deliverd</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <span className="inline-block text-gray-500 dark:text-gray-400"> from </span>

        <div>
          <label htmlFor="duration" className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white">Select duration</label>
          <select
            id="duration"
            defaultValue="this week" // Use defaultValue instead of selected
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
          >
            <option value="this week">this week</option>
            <option value="this month">this month</option>
            <option value="last 3 months">the last 3 months</option>
            <option value="last 6 months">the last 6 months</option>
            <option value="this year">this year</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default OrderFilter;