
package com.pickupkart.controller;

import com.pickupkart.model.Role;
import com.pickupkart.model.User;
import com.pickupkart.payload.request.LoginRequest;
import com.pickupkart.payload.request.RegisterRequest;
import com.pickupkart.payload.response.JwtResponse;
import com.pickupkart.payload.response.MessageResponse;
import com.pickupkart.repository.RoleRepository;
import com.pickupkart.repository.UserRepository;
import com.pickupkart.security.jwt.JwtUtils;
import com.pickupkart.security.services.UserDetailsImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getLoginName(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        JwtResponse response = new JwtResponse(
            jwt, 
            userDetails.getId(), 
            userDetails.getFullName(), 
            userDetails.getUsername(), 
            userDetails.getEmail(),
            userDetails.getMobile(),
            userDetails.getAddress(),
            userDetails.getRole()
        );
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        // Check if username is already taken
        if (userRepository.existsByLoginName(registerRequest.getLoginName())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        // Check if email is already in use
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user account
        User user = new User();
        user.setFullName(registerRequest.getFullName());
        user.setLoginName(registerRequest.getLoginName());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setEmail(registerRequest.getEmail());
        user.setMobile(registerRequest.getMobile());
        user.setAddress(registerRequest.getAddress());
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        // Set user role
        Set<Role> roles = new HashSet<>();
        Role userRole;
        
        String requestedRole = registerRequest.getRole();
        if ("ADMIN".equals(requestedRole)) {
            userRole = roleRepository.findByName(Role.ERole.ADMIN)
                    .orElseThrow(() -> new RuntimeException("Error: Role ADMIN is not found."));
        } else {
            userRole = roleRepository.findByName(Role.ERole.CUSTOMER)
                    .orElseThrow(() -> new RuntimeException("Error: Role CUSTOMER is not found."));
        }
        
        roles.add(userRole);
        user.setRoles(roles);

        userRepository.save(user);

        // Generate token for the newly registered user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(registerRequest.getLoginName(), registerRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        JwtResponse response = new JwtResponse(
            jwt, 
            userDetails.getId(), 
            userDetails.getFullName(), 
            userDetails.getUsername(), 
            userDetails.getEmail(),
            userDetails.getMobile(),
            userDetails.getAddress(),
            userDetails.getRole()
        );
        
        return ResponseEntity.ok(response);
    }
}
