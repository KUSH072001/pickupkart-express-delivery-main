
import React from 'react';

interface PaymentDetailsProps {
  paymentMethod: string;
  transactionId?: string;
  orderId: number;
}

const ReceiptPaymentDetails: React.FC<PaymentDetailsProps> = ({
  paymentMethod,
  transactionId,
  orderId,
}) => (
  <div className="grid grid-cols-2 gap-4">
    <div>
      <h3 className="font-semibold">Payment Method</h3>
      <p>{paymentMethod}</p>
      {transactionId && (
        <p>Transaction ID: {transactionId}</p>
      )}
    </div>
    <div className="text-right">
      <p className="text-xs text-muted-foreground mt-4">
        Receipt ID: RCT-{orderId}-{Date.now().toString().slice(-6)}
      </p>
    </div>
  </div>
);

export default ReceiptPaymentDetails;
