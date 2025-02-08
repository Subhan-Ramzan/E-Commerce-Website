// components/OrderItem.jsx
import Link from 'next/link';
import React from 'react';
import OrderStatus from './OrderStatus';

const OrderItem = ({ order }) => {
  const normalizedStatus = order.status.toLowerCase();
  const isProcessing = normalizedStatus === 'processing';
  const isCancelled = normalizedStatus === 'cancelled';

  return (
    <div className="flex flex-wrap items-center gap-y-4 py-6 border-b border-gray-200 dark:border-gray-700">
      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
          <Link href="#" className="hover:underline">
            {order.id}
          </Link>
        </dd>
      </dl>

      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
          {order.date}
        </dd>
      </dl>

      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Price:</dt>
        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
          {order.price}
        </dd>
      </dl>

      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
        <OrderStatus status={order.status} />
      </dl>

      <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4 mt-4 sm:mt-0">
        {isProcessing && (
          <button
            type="button"
            className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto"
          >
            Cancel order
          </button>
        )}
        {isCancelled && (
          <button
            type="button"
            className="w-full rounded-lg border border-green-700 px-3 py-2 text-center text-sm font-medium text-green-700 hover:bg-green-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-300 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-600 dark:hover:text-white dark:focus:ring-green-900 lg:w-auto"
          >
            Order Again
          </button>
        )}
        <Link
          href="#"
          className="w-full inline-flex justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
        >
          View details
        </Link>
      </div>
    </div>
  );
};

export default OrderItem;
