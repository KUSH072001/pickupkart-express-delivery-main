
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CourierBookingForm from '@/components/courier/CourierBookingForm';

const BookCourier: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold mb-6">Book a Courier</h1>
        <CourierBookingForm />
      </div>
    </DashboardLayout>
  );
};

export default BookCourier;
