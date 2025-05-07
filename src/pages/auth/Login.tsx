
import React from 'react';
import LoginForm from '@/components/auth/LoginForm';
import { Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-muted flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex items-center justify-center">
          <Package className="h-10 w-10 text-accent" />
          <h2 className="ml-3 text-3xl font-bold text-primary">PickupKart</h2>
        </div>
        <h2 className="mt-6 text-center text-2xl font-bold text-foreground">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Or{' '}
          <Link to="/register" className="font-medium text-accent hover:underline">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm />

          {/* Demo Accounts */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">Demo Accounts</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3">
              <div className="p-3 bg-muted rounded-md text-sm">
                <p className="font-semibold mb-1">Admin</p>
                <p>Username: <span className="font-mono bg-background px-1 py-0.5 rounded text-xs">admin</span></p>
                <p>Password: <span className="font-mono bg-background px-1 py-0.5 rounded text-xs">admin</span></p>
              </div>
              <div className="p-3 bg-muted rounded-md text-sm">
                <p className="font-semibold mb-1">Customer</p>
                <p>Username: <span className="font-mono bg-background px-1 py-0.5 rounded text-xs">customer</span></p>
                <p>Password: <span className="font-mono bg-background px-1 py-0.5 rounded text-xs">customer</span></p>
              </div>
            </div>
          </div>
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

export default Login;
