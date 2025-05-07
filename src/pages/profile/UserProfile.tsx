
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProfileForm from '@/components/profile/ProfileForm';

const UserProfile: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>
        <ProfileForm />
      </div>
    </DashboardLayout>
  );
};

export default UserProfile;
