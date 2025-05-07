
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface OrderSummaryProps {
  orderDetails: {
    order_id: number;
    amount: number;
    items: number;
    delivery_fee: number;
    total: number;
  };
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ orderDetails }) => (
  <Card>
    <CardHeader>
      <CardTitle>Order Summary</CardTitle>
      <CardDescription>Review details</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Order ID</span>
          <span className="font-medium">#{orderDetails.order_id}</span>
        </div>
        <div className="flex justify-between">
          <span>Items</span>
          <span>{orderDetails.items}</span>
        </div>
        <div className="flex justify-between">
          <span>Item Amount</span>
          <span>₹{orderDetails.amount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span>₹{orderDetails.delivery_fee.toFixed(2)}</span>
        </div>
        <div className="border-t pt-2 flex justify-between font-bold">
          <span>Total</span>
          <span>₹{orderDetails.total.toFixed(2)}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default OrderSummary;
