
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { userApi } from '@/services/api';
import { User } from '@/types';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useToast } from '@/components/ui/use-toast';
import { User as UserIcon, Users } from 'lucide-react';

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const usersData = await userApi.getAll();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast({
          title: 'Error',
          description: 'Could not load users.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUsers();
  }, [toast]);

  const customers = users.filter(user => user.role === 'CUSTOMER');
  const admins = users.filter(user => user.role === 'ADMIN');

  const renderUserTable = (userList: User[]) => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b">
            <th className="pb-3 font-medium">ID</th>
            <th className="pb-3 font-medium">Full Name</th>
            <th className="pb-3 font-medium">Username</th>
            <th className="pb-3 font-medium">Email</th>
            <th className="pb-3 font-medium">Mobile</th>
            <th className="pb-3 font-medium">Address</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.user_id} className="border-b">
              <td className="py-3">{user.user_id}</td>
              <td className="py-3">{user.full_name}</td>
              <td className="py-3">{user.login_name}</td>
              <td className="py-3">{user.email}</td>
              <td className="py-3">{user.mobile}</td>
              <td className="py-3">{user.address}</td>
            </tr>
          ))}
          {userList.length === 0 && (
            <tr>
              <td colSpan={6} className="py-3 text-center text-muted-foreground">
                No users found in this category
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Customers</CardTitle>
              <Users className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.length}</div>
              <p className="text-xs text-muted-foreground pt-1">Registered customers</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Administrators</CardTitle>
              <UserIcon className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{admins.length}</div>
              <p className="text-xs text-muted-foreground pt-1">System administrators</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Users ({users.length})</TabsTrigger>
            <TabsTrigger value="customers">Customers ({customers.length})</TabsTrigger>
            <TabsTrigger value="admins">Administrators ({admins.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
                <CardDescription>Complete list of all system users</CardDescription>
              </CardHeader>
              <CardContent>
                {renderUserTable(users)}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle>Customers</CardTitle>
                <CardDescription>Users who book courier services</CardDescription>
              </CardHeader>
              <CardContent>
                {renderUserTable(customers)}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="admins">
            <Card>
              <CardHeader>
                <CardTitle>Administrators</CardTitle>
                <CardDescription>Users with system administration privileges</CardDescription>
              </CardHeader>
              <CardContent>
                {renderUserTable(admins)}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ManageUsers;
