
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { productApi } from '@/services/api';
import { Product } from '@/types';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useToast } from '@/components/ui/use-toast';
import { Package } from 'lucide-react';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const productsData = await productApi.getAll();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast({
          title: 'Error',
          description: 'Could not load products.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [toast]);

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold mb-6">Available Products</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading && (
            Array(3).fill(0).map((_, index) => (
              <Card key={index} className="flex flex-col animate-pulse">
                <div className="h-48 bg-muted rounded-t-lg"></div>
                <CardHeader>
                  <div className="h-5 w-2/3 bg-muted rounded"></div>
                  <div className="h-4 w-1/2 bg-muted rounded mt-2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))
          )}
          
          {!isLoading && products.map((product) => (
            <Card key={product.product_id} className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
              <div className="h-48 bg-muted relative">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Package className="h-16 w-16 text-muted-foreground/50" />
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>Available: {product.quantity} units</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="text-2xl font-bold text-primary">₹{product.price}</div>
              </CardContent>
            </Card>
          ))}
          
          {!isLoading && products.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <Package className="h-16 w-16 text-muted-foreground" />
              <h3 className="mt-4 text-xl font-semibold">No Products Available</h3>
              <p className="text-muted-foreground">Check back later for new products.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProductList;
