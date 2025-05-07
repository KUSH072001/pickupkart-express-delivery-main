
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Courier, CourierBookingRequest, Product } from '@/types';
import { Upload, Package } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';

// Mock API for now
const fetchCouriers = async (): Promise<Courier[]> => {
  // This would be replaced with a real API call
  return [
    { courier_id: 1, name: 'Express Delivery', description: 'Same day delivery', is_custom: false },
    { courier_id: 2, name: 'Standard Delivery', description: '2-3 days delivery', is_custom: false },
    { courier_id: 3, name: 'Economy Delivery', description: '5-7 days delivery', is_custom: false },
    { courier_id: 4, name: 'Other', description: 'Custom courier service', is_custom: true },
  ];
};

const fetchProducts = async (): Promise<Product[]> => {
  // This would be replaced with a real API call
  return [
    { product_id: 1, name: 'Laptop', image: 'laptop.jpg', price: 1200, quantity: 10 },
    { product_id: 2, name: 'Smartphone', image: 'smartphone.jpg', price: 800, quantity: 20 },
    { product_id: 3, name: 'Headphones', image: 'headphones.jpg', price: 150, quantity: 30 },
  ];
};

const createBooking = async (bookingData: CourierBookingRequest): Promise<any> => {
  // This would be replaced with a real API call
  console.log('Booking data:', bookingData);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    order_id: Math.floor(Math.random() * 10000),
    message: 'Booking created successfully'
  };
};

const CourierBookingForm: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    product_id: '',
    quantity: '1',
    courier_id: '',
    custom_courier_name: '',
    notes: '',
  });
  const [productImage, setProductImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { data: couriers = [] } = useQuery({
    queryKey: ['couriers'],
    queryFn: fetchCouriers
  });

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  const bookingMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: (data) => {
      toast({
        title: "Booking successful",
        description: "Your courier booking has been created successfully.",
      });
      navigate(`/dashboard/payment/${data.order_id}`);
    },
    onError: (error) => {
      toast({
        title: "Booking failed",
        description: "There was an error creating your booking.",
        variant: "destructive",
      });
      console.error('Booking failed:', error);
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to book a courier",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    const bookingData: CourierBookingRequest = {
      customer_id: user.user_id,
      product_id: parseInt(formData.product_id),
      quantity: parseInt(formData.quantity),
      courier_id: parseInt(formData.courier_id),
      product_image: productImage,
    };
    
    if (formData.courier_id === '4' && formData.custom_courier_name) {
      bookingData.custom_courier_name = formData.custom_courier_name;
    }
    
    try {
      await bookingMutation.mutateAsync(bookingData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCourier = couriers.find(c => c.courier_id.toString() === formData.courier_id);
  const isCustomCourier = selectedCourier?.is_custom;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Book a Courier</CardTitle>
        <CardDescription>Fill in the details to book your courier service</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="product_id">Product</Label>
            <Select 
              value={formData.product_id} 
              onValueChange={(value) => handleSelectChange('product_id', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.product_id} value={product.product_id.toString()}>
                    {product.name} - ${product.price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input 
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="courier_id">Courier Service</Label>
            <Select 
              value={formData.courier_id} 
              onValueChange={(value) => handleSelectChange('courier_id', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a courier service" />
              </SelectTrigger>
              <SelectContent>
                {couriers.map((courier) => (
                  <SelectItem key={courier.courier_id} value={courier.courier_id.toString()}>
                    {courier.name}
                    {courier.description && ` - ${courier.description}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {isCustomCourier && (
            <div className="space-y-2">
              <Label htmlFor="custom_courier_name">Custom Courier Name</Label>
              <Input 
                id="custom_courier_name"
                name="custom_courier_name"
                type="text"
                value={formData.custom_courier_name}
                onChange={handleChange}
                required={isCustomCourier}
                placeholder="Enter custom courier name"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="product_image">Product Image</Label>
            <div className="flex flex-col items-center p-4 border-2 border-dashed rounded-md border-muted-foreground/25">
              {imagePreview ? (
                <div className="relative w-full">
                  <img 
                    src={imagePreview} 
                    alt="Product preview" 
                    className="mx-auto max-h-48 object-contain rounded-md"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => {
                      setProductImage(null);
                      setImagePreview(null);
                    }}
                  >
                    Remove Image
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="mb-2 h-10 w-10 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">Upload a product image</p>
                  <Input 
                    id="product_image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full max-w-xs"
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea 
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any special instructions for handling the courier"
              className="min-h-[100px]"
            />
          </div>
          
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <Package className="mr-2 h-4 w-4 animate-pulse" />
                  Processing...
                </span>
              ) : (
                <span className="flex items-center">
                  <Package className="mr-2 h-4 w-4" />
                  Book Courier
                </span>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CourierBookingForm;
