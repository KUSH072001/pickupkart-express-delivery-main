
import { Product } from '../types';
import { delay } from './config';
import { mockProducts } from './mockData';

export const productApi = {
  getAll: async (): Promise<Product[]> => {
    await delay(500);
    return [...mockProducts];
  },
  
  getById: async (id: number): Promise<Product> => {
    await delay(300);
    const product = mockProducts.find(p => p.product_id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return { ...product };
  },
  
  createProduct: async (productData: Partial<Product>): Promise<Product> => {
    await delay(700);
    
    const newProduct: Product = {
      product_id: Math.floor(Math.random() * 1000) + 200,
      name: productData.name || 'New Product',
      image: productData.image || '/placeholder.svg',
      price: productData.price || 0,
      quantity: productData.quantity || 0
    };
    
    mockProducts.push(newProduct);
    return newProduct;
  },
  
  updateProduct: async (id: number, productData: Partial<Product>): Promise<Product> => {
    await delay(500);
    
    const productIndex = mockProducts.findIndex(p => p.product_id === id);
    if (productIndex === -1) {
      throw new Error('Product not found');
    }
    
    mockProducts[productIndex] = {
      ...mockProducts[productIndex],
      ...productData
    };
    
    return mockProducts[productIndex];
  },
  
  deleteProduct: async (id: number): Promise<void> => {
    await delay(300);
    
    const productIndex = mockProducts.findIndex(p => p.product_id === id);
    if (productIndex === -1) {
      throw new Error('Product not found');
    }
    
    mockProducts.splice(productIndex, 1);
  }
};
