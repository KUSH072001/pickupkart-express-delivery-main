
package com.pickupkart.repository;

import com.pickupkart.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByLoginName(String loginName);
    
    Optional<User> findByEmail(String email);
    
    Boolean existsByLoginName(String loginName);
    
    Boolean existsByEmail(String email);
}
