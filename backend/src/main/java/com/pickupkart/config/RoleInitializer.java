
package com.pickupkart.config;

import com.pickupkart.model.Role;
import com.pickupkart.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class RoleInitializer implements ApplicationRunner {
    
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        // Initialize roles if they don't exist
        for (Role.ERole role : Role.ERole.values()) {
            if (!roleRepository.findByName(role).isPresent()) {
                roleRepository.save(new Role(role));
            }
        }
    }
}
