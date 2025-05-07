
import React from 'react';

interface CustomerInfoProps {
  customerName: string;
  customerAddress: string;
}

const ReceiptCustomerInfo: React.FC<CustomerInfoProps> = ({
  customerName,
  customerAddress,
}) => (
  <div>
    <h3 className="font-semibold">Customer Information</h3>
    <p>{customerName}</p>
    <p className="text-sm text-muted-foreground">{customerAddress}</p>
  </div>
);

export default ReceiptCustomerInfo;
