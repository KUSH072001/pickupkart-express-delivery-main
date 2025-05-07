
package com.pickupkart.repository;

import com.pickupkart.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {
    List<Product> findByQuantityGreaterThan(int quantity);
    
    @Query(value = "{}", sort = "{ name: 1 }")
    List<Product> findAllOrderedByName();
    
    @Query("{ 'name': { $regex: ?0, $options: 'i' }}")
    List<Product> searchByNameContaining(String keyword);
}
