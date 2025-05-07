
package com.pickupkart.repository;

import com.pickupkart.model.Order;
import com.pickupkart.model.Payment;
import com.pickupkart.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends MongoRepository<Payment, String> {
    Optional<Payment> findByOrder(Order order);
    
    Optional<Payment> findByTransactionId(String transactionId);
    
    // Find all payments by customer (through orders)
    @Query("{ 'order.customer._id': ?0 }")
    List<Payment> findAllByCustomerOrderByPaymentDateDesc(String customerId);
    
    // Find payments by status
    List<Payment> findByStatus(Payment.PaymentStatus status);
    
    // Find payments by order status
    @Query("{ 'order.status': ?0 }")
    List<Payment> findByOrderStatus(Order.OrderStatus status);
}
