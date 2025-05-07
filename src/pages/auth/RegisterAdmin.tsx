
import React from 'react';
import { Link } from 'react-router-dom';
import RegisterAdminForm from '@/components/auth/RegisterAdminForm';
import { Package } from 'lucide-react';

const RegisterAdmin: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-muted/30 p-4">
      <div className="flex items-center mb-6">
        <Package className="h-8 w-8 text-primary mr-2" />
        <h1 className="text-3xl font-bold">PickupKart</h1>
      </div>
      
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Registration</h2>
        <RegisterAdminForm />
        
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Log In
            </Link>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            <Link to="/register" className="text-accent hover:underline">
              Register as Customer
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterAdmin;
