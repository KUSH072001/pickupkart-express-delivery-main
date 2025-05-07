
import React from 'react';

interface SummaryTableProps {
  productName: string;
  quantity: number;
  amount: number;
}

const ReceiptOrderSummaryTable: React.FC<SummaryTableProps> = ({
  productName,
  quantity,
  amount,
}) => (
  <div className="border rounded-md">
    <table className="w-full">
      <thead className="bg-muted">
        <tr>
          <th className="text-left p-2">Item</th>
          <th className="text-center p-2">Quantity</th>
          <th className="text-right p-2">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-t">
          <td className="p-2">{productName}</td>
          <td className="text-center p-2">{quantity}</td>
          <td className="text-right p-2">₹{amount.toFixed(2)}</td>
        </tr>
      </tbody>
      <tfoot className="bg-muted/50">
        <tr className="border-t">
          <td className="p-2 font-medium" colSpan={2}>Total</td>
          <td className="text-right p-2 font-bold">₹{amount.toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>
  </div>
);

export default ReceiptOrderSummaryTable;
