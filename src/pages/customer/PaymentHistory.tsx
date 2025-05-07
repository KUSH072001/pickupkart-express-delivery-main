
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { paymentApi } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { FileDown, Check, X, Info } from 'lucide-react';
import { format } from 'date-fns';
import { Payment } from '@/types';

type PaymentRecord = Payment & {
  product_name: string;
};

const PaymentHistory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [downloading, setDownloading] = useState<number | null>(null);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      if (!user?.user_id) return;

      try {
        setIsLoading(true);
        const paymentHistory = await paymentApi.getPaymentHistory(user.user_id);
        setPayments(paymentHistory as PaymentRecord[]);
      } catch (error) {
        console.error('Failed to fetch payment history:', error);
        toast({
          title: 'Error',
          description: 'Failed to load payment history.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentHistory();
  }, [user, toast]);

  const handleDownloadReceipt = async (orderId: number) => {
    try {
      setDownloading(orderId);
      toast({
        title: 'Downloading...',
        description: 'Preparing your receipt for download.',
      });
      
      await paymentApi.downloadReceipt(orderId);
      
      toast({
        title: 'Success',
        description: 'Receipt downloaded successfully!',
      });
    } catch (error) {
      console.error('Download failed:', error);
      toast({
        title: 'Download Failed',
        description: 'Could not download the receipt. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setDownloading(null);
    }
  };

  const handleViewDetails = (orderId: number) => {
    navigate(`/dashboard/receipt/${orderId}`);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold mb-6">Payment History</h1>

        <Card>
          <CardHeader>
            <CardTitle>All Payments</CardTitle>
            <CardDescription>View and download your payment receipts</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : payments.length > 0 ? (
              <Table>
                <TableCaption>List of all your payment transactions</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount (₹)</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.payment_id}>
                      <TableCell className="font-medium">#{payment.order_id}</TableCell>
                      <TableCell>{payment.product_name}</TableCell>
                      <TableCell>{formatDate(payment.payment_date)}</TableCell>
                      <TableCell>₹{payment.payment_amount.toFixed(2)}</TableCell>
                      <TableCell>
                        {payment.status === 'COMPLETED' ? (
                          <Badge className="bg-green-500 hover:bg-green-600">
                            <Check className="h-3 w-3 mr-1" /> Success
                          </Badge>
                        ) : payment.status === 'FAILED' || payment.status === 'REFUNDED' ? (
                          <Badge variant="destructive">
                            <X className="h-3 w-3 mr-1" /> Failed
                          </Badge>
                        ) : (
                          <Badge variant="outline">
                            <Info className="h-3 w-3 mr-1" /> {payment.status}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(payment.order_id)}
                          >
                            Details
                          </Button>
                          {payment.status === 'COMPLETED' && (
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handleDownloadReceipt(payment.order_id)}
                              disabled={downloading === payment.order_id}
                            >
                              {downloading === payment.order_id ? (
                                <span className="animate-pulse">Downloading...</span>
                              ) : (
                                <>
                                  <FileDown className="h-4 w-4 mr-1" />
                                  Download
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No payment records found
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PaymentHistory;
