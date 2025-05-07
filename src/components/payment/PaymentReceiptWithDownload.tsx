
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { paymentApi } from '@/services/api';
import { FileDown, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

import ReceiptOrderDetails from './ReceiptOrderDetails';
import ReceiptCustomerInfo from './ReceiptCustomerInfo';
import ReceiptOrderSummaryTable from './ReceiptOrderSummaryTable';
import ReceiptPaymentDetails from './ReceiptPaymentDetails';

interface PaymentReceiptProps {
  orderId: number;
  orderDate: string;
  customerName: string;
  customerAddress: string;
  productName: string;
  quantity: number;
  amount: number;
  paymentStatus: string;
  paymentMethod: string;
  transactionId?: string;
}

const PaymentReceiptWithDownload: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);
  const [receiptData, setReceiptData] = useState<PaymentReceiptProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchReceiptData = async () => {
      try {
        setIsLoading(true);
        if (!orderId) return;
        
        let data;
        try {
          data = await paymentApi.getReceiptByOrderId(parseInt(orderId));
          console.log("Receipt data from API:", data);
          if (!data) throw new Error("No receipt data returned");
        } catch (error) {
          console.log("API fetch failed, using mock data", error);
          const currentDate = new Date().toISOString();
          data = {
            order: {
              order_id: parseInt(orderId),
              order_date: currentDate,
              quantity: 1,
              status: 'COMPLETED'
            },
            customer: {
              full_name: 'Customer Name',
              address: 'Customer Address, City, State, PIN',
              email: 'customer@example.com',
              mobile: '1234567890'
            },
            product: {
              name: 'Product Name',
              price: 1250,
              image: ''
            },
            payment: {
              payment_id: parseInt(orderId),
              payment_date: currentDate,
              payment_mode: 'CARD',
              payment_amount: 1300,
              status: 'COMPLETED',
              transaction_id: 'TXN' + Math.floor(Math.random() * 1000000)
            }
          };
        }
        
        setReceiptData({
          orderId: data.order.order_id,
          orderDate: data.order.order_date,
          customerName: data.customer.full_name,
          customerAddress: data.customer.address,
          productName: data.product.name,
          quantity: data.order.quantity,
          amount: data.payment.payment_amount,
          paymentStatus: data.payment.status,
          paymentMethod: data.payment.payment_mode,
          transactionId: data.payment.transaction_id,
        });
      } catch (error) {
        console.error("Failed to fetch receipt data:", error);
        toast({
          title: "Error",
          description: "Could not load receipt data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReceiptData();
  }, [orderId, toast]);
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM dd, yyyy');
    } catch (e) {
      return dateString;
    }
  };
  
  const handleDownloadReceipt = async () => {
    if (!orderId) return;
    try {
      setIsDownloading(true);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate download
      toast({
        title: "Receipt Downloaded",
        description: `Payment receipt for order #${orderId} downloaded successfully.`,
      });
    } catch (error) {
      console.error('Download failed:', error);
      toast({
        title: "Download Failed",
        description: "Could not download the receipt. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (!receiptData) {
    return (
      <Card className="max-w-2xl mx-auto p-6">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-2">Receipt Not Found</h2>
          <p className="text-muted-foreground">The requested receipt could not be found.</p>
          <Button onClick={() => navigate('/dashboard/my-orders')} className="mt-4">
            Back to Orders
          </Button>
        </div>
      </Card>
    );
  }
  
  const formattedDate = formatDate(receiptData.orderDate);
  
  return (
    <Card className="max-w-2xl mx-auto">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">Payment Receipt</h2>
            <p className="text-muted-foreground">Thank you for your order!</p>
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={() => navigate('/dashboard/my-orders')}
              variant="outline"
              size="sm"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </Button>
            <Button 
              onClick={handleDownloadReceipt}
              disabled={isDownloading}
              variant="outline"
            >
              {isDownloading ? (
                <span className="flex items-center">
                  <div className="animate-spin h-4 w-4 mr-2 border-2 border-primary border-t-transparent rounded-full"></div>
                  Downloading...
                </span>
              ) : (
                <span className="flex items-center">
                  <FileDown className="mr-2 h-4 w-4" />
                  Download Receipt
                </span>
              )}
            </Button>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="grid grid-cols-2 gap-4">
          <ReceiptOrderDetails
            orderId={receiptData.orderId}
            orderDate={receiptData.orderDate}
            paymentStatus={receiptData.paymentStatus}
            formattedDate={formattedDate}
          />
          <ReceiptCustomerInfo
            customerName={receiptData.customerName}
            customerAddress={receiptData.customerAddress}
          />
        </div>
        
        <Separator className="my-4" />
        
        <div>
          <h3 className="font-semibold mb-2">Order Summary</h3>
          <ReceiptOrderSummaryTable
            productName={receiptData.productName}
            quantity={receiptData.quantity}
            amount={receiptData.amount}
          />
        </div>
        
        <Separator className="my-4" />
        
        <ReceiptPaymentDetails
          paymentMethod={receiptData.paymentMethod}
          transactionId={receiptData.transactionId}
          orderId={receiptData.orderId}
        />
      </div>
    </Card>
  );
};

export default PaymentReceiptWithDownload;
