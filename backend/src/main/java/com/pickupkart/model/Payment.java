
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
@Document(collection = "payments")
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    @Id
    private String id;
    
    @DBRef
    private Order order;
    
    private PaymentMode paymentMode;
    
    private BigDecimal paymentAmount;
    
    private PaymentStatus status;
    
    private LocalDateTime paymentDate;
    
    private String transactionId;
    
    // Timestamps
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = this.createdAt;
        if (this.paymentDate == null) {
            this.paymentDate = this.createdAt;
        }
    }
    
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
    
    public enum PaymentMode {
        UPI, CARD, CASH
    }
    
    public enum PaymentStatus {
        PENDING, COMPLETED, FAILED, REFUNDED
    }
}
