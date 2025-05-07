
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { 
  Package, 
  User, 
  Users, 
  List, 
  ListCheck, 
  LogOut,
  Receipt,
  Book,
  CreditCard
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigateTo = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const renderNavItems = () => {
    // Common navigation items
    let navItems = [
      {
        icon: <Package size={20} />,
        label: 'Dashboard',
        path: '/dashboard',
      }
    ];

    // Role-specific navigation items
    if (user?.role === 'ADMIN') {
      navItems = [
        ...navItems,
        {
          icon: <Users size={20} />,
          label: 'Manage Users',
          path: '/dashboard/users',
        },
        {
          icon: <List size={20} />,
          label: 'All Orders',
          path: '/dashboard/orders',
        },
        {
          icon: <Package size={20} />,
          label: 'Manage Products',
          path: '/dashboard/manage-products',
        }
      ];
    } else if (user?.role === 'CUSTOMER') {
      navItems = [
        ...navItems,
        {
          icon: <Package size={20} />,
          label: 'Book Courier',
          path: '/dashboard/book-courier',
        },
        {
          icon: <ListCheck size={20} />,
          label: 'My Orders',
          path: '/dashboard/my-orders',
        },
        {
          icon: <CreditCard size={20} />,
          label: 'Payment History',
          path: '/dashboard/payment-history',
        },
        {
          icon: <Book size={20} />,
          label: 'Blog',
          path: '/dashboard/blog',
        }
      ];
    }

    return navItems.map((item, index) => (
      <Button
        key={index}
        variant={isActive(item.path) ? "secondary" : "ghost"}
        className={`flex ${isCollapsed ? 'justify-center' : 'justify-start'} w-full px-3 py-2`}
        onClick={() => navigateTo(item.path)}
      >
        <div className="flex items-center space-x-3">
          <div>{item.icon}</div>
          {!isCollapsed && <span>{item.label}</span>}
        </div>
      </Button>
    ));
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {/* Logo and collapse button */}
        <div className={`p-4 border-b border-sidebar-border flex ${isCollapsed ? 'justify-center' : 'justify-between'} items-center`}>
          {!isCollapsed && (
            <h1 className="font-bold text-lg text-sidebar-primary">PickupKart</h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            {isCollapsed ? '→' : '←'}
          </Button>
        </div>

        {/* Nav items */}
        <div className="flex-1 py-4 flex flex-col space-y-1">
          {renderNavItems()}
        </div>

        {/* User section */}
        <div className={`border-t border-sidebar-border p-4 ${isCollapsed ? 'text-center' : ''}`}>
          <div className="flex items-center mb-3 cursor-pointer" onClick={() => navigateTo('/dashboard/profile/edit')}>
            <User size={20} className="hover:text-primary transition-colors" />
            {!isCollapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium truncate">{user?.full_name}</p>
                <p className="text-xs text-sidebar-foreground/70 capitalize">{user?.role.toLowerCase().replace('_', ' ')}</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            className={`flex ${isCollapsed ? 'justify-center' : 'justify-start'} w-full hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
            onClick={handleLogout}
          >
            <LogOut size={20} />
            {!isCollapsed && <span className="ml-2">Log Out</span>}
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b py-4 px-6">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-xl">
              {user?.role === 'ADMIN'
                ? 'Admin Dashboard'
                : 'Customer Dashboard'}
            </h1>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground mr-2">
                {user?.email}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
