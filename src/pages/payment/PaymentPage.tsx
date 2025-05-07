import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PaymentForm from '@/components/payment/PaymentForm';
import OTPVerification from './OTPVerification';

const PaymentPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold mb-6">Complete Your Payment</h1>
        <PaymentForm />
      </div>
    </DashboardLayout>
  );
};

export default PaymentPage;
