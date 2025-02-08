// components/OrderStatus.jsx
import React from 'react';
import { FaSpinner, FaTruck, FaCheck, FaQuestion, FaTimes } from 'react-icons/fa';

const OrderStatus = ({ status }) => {
  let bgClass, textClass, Icon, iconProps = {};
  const normalizedStatus = status.toLowerCase();

  switch (normalizedStatus) {
    case 'processing':
      bgClass = 'bg-yellow-100 dark:bg-yellow-900';
      textClass = 'text-yellow-800 dark:text-yellow-300';
      Icon = FaSpinner;
      iconProps = { className: 'mr-1 animate-spin' };
      break;
    case 'shipped / dispatched':
      bgClass = 'bg-blue-100 dark:bg-blue-900';
      textClass = 'text-blue-800 dark:text-blue-300';
      Icon = FaTruck;
      iconProps = { className: 'mr-1' };
      break;
    case 'delivered':
      bgClass = 'bg-green-100 dark:bg-green-900';
      textClass = 'text-green-800 dark:text-green-300';
      Icon = FaCheck;
      iconProps = { className: 'mr-1' };
      break;
    case 'cancelled':
      bgClass = 'bg-red-100 dark:bg-red-900';
      textClass = 'text-red-800 dark:text-red-300';
      Icon = FaTimes;
      iconProps = { className: 'mr-1' };
      break;
    default:
      bgClass = 'bg-gray-100 dark:bg-gray-900';
      textClass = 'text-gray-800 dark:text-gray-300';
      Icon = FaQuestion;
      iconProps = { className: 'mr-1' };
      break;
  }

  return (
    <dd className={`inline-flex items-center rounded ${bgClass} px-2.5 py-0.5 text-xs font-medium ${textClass}`}>
      {Icon && <Icon {...iconProps} />}
      <span>{status}</span>
    </dd>
  );
};

export default OrderStatus;
