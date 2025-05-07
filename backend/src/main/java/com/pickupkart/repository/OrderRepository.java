
package com.pickupkart.repository;

import com.pickupkart.model.Order;
import com.pickupkart.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    List<Order> findByCustomer(User customer);
    
    List<Order> findByCustomerOrderByOrderDateDesc(User customer);
    
    List<Order> findByStatus(Order.OrderStatus status);
    
    // Find orders with payment information
    @Query(value = "{ 'customer._id': ?0 }", sort = "{ orderDate: -1 }")
    List<Order> findOrdersWithPaymentsByCustomerId(String customerId);
    
    // Find order with payment and product details for receipt generation
    @Query("{ '_id': ?0 }")
    Order findOrderWithPaymentAndProductDetails(String orderId);
    
    // Find all orders with their payment status for payment history
    // MongoDB aggregation will be needed for this in the service layer
    @Query(value = "{ 'customer._id': ?0 }", sort = "{ orderDate: -1 }")
    List<Order> findOrdersWithPaymentStatus(String customerId);
}
