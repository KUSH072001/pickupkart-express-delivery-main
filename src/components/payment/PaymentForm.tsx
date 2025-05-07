import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast as showToast } from '@/hooks/use-toast';
import { PaymentMode, PaymentRequest } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { useMutation } from '@tanstack/react-query';
import { CreditCard, Clock, QrCode } from 'lucide-react';
import * as QRCodeLib from 'qrcode.react';
import OrderSummary from "./OrderSummary";
import CardPaymentForm from "./CardPaymentForm";
import UpiPaymentForm from "./UpiPaymentForm";

const processPayment = async (paymentData: PaymentRequest): Promise<any> => {
  // This should be replaced with a real API call
  console.log('Payment data:', paymentData);
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    transaction_id: 'TXN' + Math.floor(Math.random() * 1000000),
    status: 'COMPLETED',
    message: 'Payment processed successfully'
  };
};

const CARD_NUMBER_REGEX = /^[0-9]{16}$/;
const EXPIRY_REGEX = /^(0[1-9]|1[0-2])\/\d{2}$/;
const CVV_REGEX = /^[0-9]{3}$/;

const PaymentForm: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMode>('CARD');
  const orderDetails = {
    order_id: parseInt(orderId || '0'),
    amount: 1250.00,
    items: 2,
    delivery_fee: 50.00,
    total: 1300.00
  };
  const [formData, setFormData] = useState({
    card_name: '',
    card_number: '',
    card_expiry: '',
    card_cvv: '',
    upi_id: '',
  });
  const [errors, setErrors] = useState<{[k: string]: string}>({});

  const paymentMutation = useMutation({
    mutationFn: processPayment,
    onSuccess: (data) => {},
    onError: () => {}
  });

  const cardValidate = () => {
    const errs: {[k: string]: string} = {};
    if (!formData.card_name) errs.card_name = 'Name required';
    if (!CARD_NUMBER_REGEX.test(formData.card_number.replace(/\s+/g, ''))) errs.card_number = 'Must be 16 digits';
    if (!EXPIRY_REGEX.test(formData.card_expiry)) errs.card_expiry = 'MM/YY';
    else {
      const [mm, yy] = formData.card_expiry.split('/');
      const now = new Date();
      const expDate = new Date(2000 + Number(yy), Number(mm)-1 + 1, 1);
      if (expDate < now) errs.card_expiry = 'Expired';
    }
    if (!CVV_REGEX.test(formData.card_cvv)) errs.card_cvv = 'Must be 3 digits';
    return errs;
  };

  const upiValidate = () => {
    const errs: {[k: string]: string} = {};
    if (!formData.upi_id || !formData.upi_id.includes('@'))
      errs.upi_id = 'Invalid UPI ID';
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prevErrs => ({ ...prevErrs, [name]: '' }));
    if (name.startsWith('card_') && paymentMethod === 'CARD') {
      const errs = cardValidate();
      setErrors((old) => ({ ...old, ...errs }));
    }
    if (name === 'upi_id' && paymentMethod === 'UPI') {
      const errs = upiValidate();
      setErrors(old => ({ ...old, ...errs }));
    }
  };

  const upiPayload = `upi://pay?pa=testuser@upi&pn=PickupKart&am=${orderDetails.total}&tn=Order%20${orderDetails.order_id}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      showToast({
        title: "Authentication required",
        description: "Please login to make a payment",
        variant: "destructive",
      });
      return;
    }

    let errs: {[k: string]: string} = {};
    if (paymentMethod === 'CARD') errs = cardValidate();
    if (paymentMethod === 'UPI') errs = upiValidate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      showToast({
        title: "Invalid payment details",
        description: "Please fix errors before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    setShowLoader(true);

    setTimeout(() => {
      setShowLoader(false);
      if (paymentMethod === 'CARD' || paymentMethod === 'UPI') {
        navigate(`/dashboard/payment/processing/${orderDetails.order_id}`, {
          state: {
            orderId: orderDetails.order_id,
            amount: orderDetails.total,
            paymentMethod,
            cardName: formData.card_name,
            cardNumber: formData.card_number
          }
        });
      } else {
        showToast({
          title: "Cash on Delivery selected",
          description: "Pay at the time of delivery. Thank you!",
        });
        navigate('/dashboard/my-orders');
      }
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto animate-fade-in">
      <div className="flex flex-col gap-4">
        <Card className="mb-4 flex-1">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <QrCode className="h-5 w-5 text-primary" /> Scan to Pay via UPI
              </div>
            </CardTitle>
            <CardDescription>
              Scan with GPay/PhonePe/Paytm. <span className="font-medium">Amount</span> auto-filled.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <QRCodeLib.QRCodeSVG value={upiPayload} size={148} />
              <div className="mt-2 text-xs text-muted-foreground">
                UPI: <span className="font-mono">{`testuser@upi`}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <OrderSummary orderDetails={orderDetails} />
      </div>

      <Card className="flex-1 min-w-[290px]">
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
          <CardDescription>
            Choose how you'd like to pay & complete your order
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-7">
            <RadioGroup
              defaultValue={paymentMethod}
              onValueChange={(value) => { setPaymentMethod(value as PaymentMode); setErrors({}); }}
              className="space-y-2"
            >
              <div className={`flex items-center space-x-2 border rounded-md p-3 transition-shadow ${paymentMethod === 'CARD' ? 'ring-2 ring-primary/80' : ''}`}>
                <RadioGroupItem value="CARD" id="cardpay" />
                <Label htmlFor="cardpay" className="flex items-center cursor-pointer">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Card (Debit/Credit)
                </Label>
              </div>
              <div className={`flex items-center space-x-2 border rounded-md p-3 transition-shadow ${paymentMethod === 'UPI' ? 'ring-2 ring-primary/80' : ''}`}>
                <RadioGroupItem value="UPI" id="upi" />
                <Label htmlFor="upi" className="cursor-pointer">UPI Payment</Label>
              </div>
              <div className={`flex items-center space-x-2 border rounded-md p-3 transition-shadow ${paymentMethod === 'CASH' ? 'ring-2 ring-primary/80' : ''}`}>
                <RadioGroupItem value="CASH" id="cash" />
                <Label htmlFor="cash" className="cursor-pointer">Cash on Delivery</Label>
              </div>
            </RadioGroup>
            {paymentMethod === 'CARD' && (
              <CardPaymentForm
                formData={formData}
                errors={errors}
                onChange={handleChange}
              />
            )}
            {paymentMethod === 'UPI' && (
              <UpiPaymentForm
                value={formData.upi_id}
                error={errors.upi_id}
                onChange={handleChange}
              />
            )}
            <div className="pt-2">
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || showLoader}
              >
                {showLoader ? (
                  <span className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    Processing Payment...
                  </span>
                ) : (
                  <span>Pay ₹{orderDetails.total.toFixed(2)}</span>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default PaymentForm;
