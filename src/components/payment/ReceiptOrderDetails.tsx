
import React from 'react';

interface OrderDetailsProps {
  orderId: number;
  orderDate: string;
  paymentStatus: string;
  formattedDate: string;
}

const ReceiptOrderDetails: React.FC<OrderDetailsProps> = ({
  orderId,
  orderDate,
  paymentStatus,
  formattedDate,
}) => (
  <div>
    <h3 className="font-semibold">Order Details</h3>
    <p>Order Number: #{orderId}</p>
    <p>Date: {formattedDate}</p>
    <p>
      Status:{" "}
      <span
        className={`font-medium ${
          paymentStatus === "COMPLETED"
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {paymentStatus}
      </span>
    </p>
  </div>
);

export default ReceiptOrderDetails;
