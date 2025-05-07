
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Book, ArrowRight, Calendar, User } from 'lucide-react';

const Blog: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'How to Choose the Right Packaging for Your Product',
      excerpt: 'Learn about the different types of packaging materials and how to choose the best one for your product.',
      date: 'April 15, 2025',
      author: 'Packaging Expert',
      image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: 2,
      title: 'Sustainable Shipping: Eco-Friendly Practices',
      excerpt: 'Discover how to reduce your environmental impact while ensuring your packages arrive safely and on time.',
      date: 'April 10, 2025',
      author: 'Green Logistics Team',
      image: 'https://images.unsplash.com/photo-1605508607564-1be88fbc95b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: 3,
      title: 'International Shipping: What You Need to Know',
      excerpt: 'A comprehensive guide to navigating the complexities of international shipping regulations and customs.',
      date: 'April 5, 2025',
      author: 'Global Shipping Advisor',
      image: 'https://images.unsplash.com/photo-1524522173746-f628baad3644?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">PickupKart Blog</h1>
          <Button variant="outline" className="flex items-center">
            Subscribe <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-muted-foreground">
          Stay updated with the latest insights, tips, and news from the courier and logistics industry.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle>{post.title}</CardTitle>
                <CardDescription className="flex items-center space-x-2">
                  <Calendar className="h-3 w-3" />
                  <span>{post.date}</span>
                  <span>•</span>
                  <User className="h-3 w-3" />
                  <span>{post.author}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="p-0">
                  Read more <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Book className="mr-2 h-5 w-5" />
              Latest Articles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex justify-between border-b pb-2">
                <span>Comparing Express vs Standard Shipping Options</span>
                <span className="text-muted-foreground">Apr 1, 2025</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span>How to Track Your Package Effectively</span>
                <span className="text-muted-foreground">Mar 28, 2025</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span>Insurance Options for High-Value Shipments</span>
                <span className="text-muted-foreground">Mar 22, 2025</span>
              </li>
              <li className="flex justify-between">
                <span>The Future of Last-Mile Delivery</span>
                <span className="text-muted-foreground">Mar 15, 2025</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View All Articles</Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Blog;
