
import React from 'react';
import RegisterForm from '@/components/auth/RegisterForm';
import { Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  return (
    <div className="min-h-screen bg-muted flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex items-center justify-center">
          <Package className="h-10 w-10 text-accent" />
          <h2 className="ml-3 text-3xl font-bold text-primary">PickupKart</h2>
        </div>
        <h2 className="mt-6 text-center text-2xl font-bold text-foreground">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Or{' '}
          <Link to="/login" className="font-medium text-accent hover:underline">
            sign in to your account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <RegisterForm />
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link to="/" className="text-sm text-muted-foreground hover:text-accent">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Register;
