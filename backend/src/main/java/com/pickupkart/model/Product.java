
package com.pickupkart.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Document(collection = "products")
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    private String id;
    
    private String name;
    
    private String description;
    
    private BigDecimal price;
    
    private Integer quantity;
    
    private String imageUrl;
    
    // Timestamps
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = this.createdAt;
    }
    
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
