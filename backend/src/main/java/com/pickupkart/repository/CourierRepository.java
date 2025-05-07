
package com.pickupkart.repository;

import com.pickupkart.model.Courier;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourierRepository extends MongoRepository<Courier, String> {
    List<Courier> findByIsCustom(Boolean isCustom);
}
