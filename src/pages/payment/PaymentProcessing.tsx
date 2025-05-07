
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { paymentApi } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { PaymentMode, PaymentStatus } from '@/types';

const PaymentProcessing: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [isProcessing, setIsProcessing] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  const paymentState = location.state as {
    orderId: number;
    amount: number;
    paymentMethod: PaymentMode;
    cardName?: string;
    cardNumber?: string;
    upiId?: string;
  } | undefined;

  useEffect(() => {
    const processPayment = async () => {
      if (!orderId) {
        toast({
          title: 'Error',
          description: 'Order ID is missing',
          variant: 'destructive',
        });
        navigate('/dashboard/my-orders');
        return;
      }

      try {
        console.log('Processing payment for order:', orderId);
        console.log('Payment state:', paymentState);
        
        // Create payment data - either from state or fallback to default values
        const paymentData = {
          order_id: Number(orderId),
          payment_mode: paymentState?.paymentMethod || 'CARD',
          payment_amount: paymentState?.amount || 1300.00,
          status: 'COMPLETED' as PaymentStatus, // Fix: Cast string to PaymentStatus type
          transaction_id: 'TXN' + Math.floor(Math.random() * 1000000)
        };

        // Process the payment
        console.log('Payment data to process:', paymentData);
        
        // Simulate API call to process payment
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Create a payment record in the mock API
        try {
          await paymentApi.createPayment(paymentData);
          console.log('Payment created successfully');
        } catch (error) {
          console.warn('Failed to create payment record, but continuing:', error);
        }
        
        // Show success toast
        toast({
          title: 'Payment Successful',
          description: 'Your payment has been processed successfully',
        });

        // After 1 second, navigate to the receipt page
        setTimeout(() => {
          navigate(`/dashboard/receipt/${orderId}`);
        }, 1000);
      } catch (error) {
        console.error('Payment processing error:', error);
        toast({
          title: 'Payment Failed',
          description: 'There was an error processing your payment',
          variant: 'destructive',
        });
        navigate('/dashboard/my-orders');
      }
    };

    processPayment();
  }, [orderId, navigate, toast, paymentState]);

  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <div className="bg-card p-12 rounded-lg shadow-lg flex flex-col items-center space-y-6 max-w-md w-full">
        {isProcessing && (
          <>
            <div className="relative h-20 w-20">
              <Loader size={80} className="animate-spin text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Processing Payment</h2>
            <p className="text-center text-muted-foreground">
              Please wait while we process your payment. This may take a few moments.
            </p>
            <div className="w-full bg-muted rounded-full h-2.5 mt-4">
              <div className="bg-primary h-2.5 rounded-full animate-pulse w-3/4"></div>
            </div>
            <p className="text-sm text-muted-foreground">Do not close this window...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentProcessing;
