
package com.pickupkart.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Document(collection = "orders")
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    private String id;
    
    @DBRef
    private User customer;
    
    @DBRef
    private Product product;
    
    @DBRef
    private Courier courier;
    
    private Integer quantity;
    
    private BigDecimal amount;
    
    private OrderStatus status;
    
    private String customCourierName;
    
    private String productImagePath;
    
    private LocalDateTime orderDate;
    
    private LocalDateTime deliveryDate;
    
    // Timestamps
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = this.createdAt;
        if (this.orderDate == null) {
            this.orderDate = this.createdAt;
        }
    }
    
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
    
    public enum OrderStatus {
        PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED
    }
}
