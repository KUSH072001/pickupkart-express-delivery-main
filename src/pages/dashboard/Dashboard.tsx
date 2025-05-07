
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import AdminDashboard from './AdminDashboard';
import CustomerDashboard from './CustomerDashboard';
import DashboardLayout from '@/components/layout/DashboardLayout';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    if (user?.role === 'ADMIN') {
      return <AdminDashboard />;
    } else if (user?.role === 'CUSTOMER') {
      return <CustomerDashboard />;
    } else {
      return <div>Unauthorized access</div>;
    }
  };

  return (
    <DashboardLayout>
      {renderDashboard()}
    </DashboardLayout>
  );
};

export default Dashboard;
