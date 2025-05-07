
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Page imports
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterAdmin from "./pages/auth/RegisterAdmin";
import Dashboard from "./pages/dashboard/Dashboard";
import BookCourier from "./pages/customer/BookCourier";
import MyOrders from "./pages/customer/MyOrders";
import PaymentHistory from "./pages/customer/PaymentHistory";
import Blog from "./pages/customer/Blog";
import ManageOrders from "./pages/admin/ManageOrders";
import ManageUsers from "./pages/admin/ManageUsers";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/profile/UserProfile";
import ProfileEdit from "./pages/profile/ProfileEdit";
import ProductList from "./pages/products/ProductList";
import ManageProducts from "./pages/admin/ManageProducts";
import PaymentPage from "./pages/payment/PaymentPage";
import PaymentProcessing from "./pages/payment/PaymentProcessing";
import PaymentReceipt from "./components/payment/PaymentReceipt";
import PaymentReceiptWithDownload from "./components/payment/PaymentReceiptWithDownload";

// Initialize QueryClient
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-admin" element={<RegisterAdmin />} />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Profile Routes */}
            <Route
              path="/dashboard/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/profile/edit"
              element={
                <ProtectedRoute>
                  <ProfileEdit />
                </ProtectedRoute>
              }
            />
            
            {/* Product Routes */}
            <Route
              path="/dashboard/products"
              element={
                <ProtectedRoute>
                  <ProductList />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/dashboard/manage-products"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <ManageProducts />
                </ProtectedRoute>
              }
            />
            
            {/* Customer Routes */}
            <Route
              path="/dashboard/book-courier"
              element={
                <ProtectedRoute allowedRoles={['CUSTOMER']}>
                  <BookCourier />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/my-orders"
              element={
                <ProtectedRoute allowedRoles={['CUSTOMER']}>
                  <MyOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/payment-history"
              element={
                <ProtectedRoute allowedRoles={['CUSTOMER']}>
                  <PaymentHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/blog"
              element={
                <ProtectedRoute allowedRoles={['CUSTOMER']}>
                  <Blog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/payment/:orderId"
              element={
                <ProtectedRoute allowedRoles={['CUSTOMER']}>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/payment/processing/:orderId"
              element={
                <ProtectedRoute allowedRoles={['CUSTOMER']}>
                  <PaymentProcessing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/receipt/:orderId"
              element={
                <ProtectedRoute>
                  <PaymentReceiptWithDownload />
                </ProtectedRoute>
              }
            />
            
            {/* Admin Routes */}
            <Route
              path="/dashboard/orders"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <ManageOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/users"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <ManageUsers />
                </ProtectedRoute>
              }
            />
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
