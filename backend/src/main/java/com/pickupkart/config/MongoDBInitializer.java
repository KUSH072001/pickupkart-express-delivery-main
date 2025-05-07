
package com.pickupkart.config;

import com.pickupkart.model.*;
import com.pickupkart.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Component
public class MongoDBInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private CourierRepository courierRepository;
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private PaymentRepository paymentRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Initialize only if the database is empty
        if (roleRepository.count() == 0) {
            initRoles();
            User adminUser = initUsers();
            Product smartphone = initProducts();
            Courier expressDelivery = initCouriers();
            Order order = initOrders(adminUser, smartphone, expressDelivery);
            initPayments(order);
        }
    }

    private void initRoles() {
        roleRepository.save(new Role(null, Role.ERole.ADMIN));
        roleRepository.save(new Role(null, Role.ERole.CUSTOMER));
        System.out.println("Roles initialized");
    }

    private User initUsers() {
        // Create admin user
        User adminUser = new User();
        adminUser.setFullName("Admin User");
        adminUser.setLoginName("admin");
        adminUser.setPassword(passwordEncoder.encode("admin")); // Changed password to "admin" for easier testing
        adminUser.setMobile("9876543210");
        adminUser.setEmail("admin@pickupkart.in");
        adminUser.setAddress("PickupKart HQ, Delhi");
        Set<Role> adminRoles = new HashSet<>();
        roleRepository.findByName(Role.ERole.ADMIN).ifPresent(adminRoles::add);
        adminUser.setRoles(adminRoles);
        adminUser.onCreate();
        
        // Create customer user
        User customerUser = new User();
        customerUser.setFullName("Sample Customer");
        customerUser.setLoginName("customer");
        customerUser.setPassword(passwordEncoder.encode("customer")); // Changed password to "customer" for easier testing
        customerUser.setMobile("9876543211");
        customerUser.setEmail("user2025@gmail.com");
        customerUser.setAddress("123 Customer Street, Mumbai");
        Set<Role> customerRoles = new HashSet<>();
        roleRepository.findByName(Role.ERole.CUSTOMER).ifPresent(customerRoles::add);
        customerUser.setRoles(customerRoles);
        customerUser.onCreate();
        
        userRepository.save(adminUser);
        userRepository.save(customerUser);
        
        System.out.println("Users initialized");
        return customerUser;
    }

    private Product initProducts() {
        Product laptop = new Product();
        laptop.setName("Laptop");
        laptop.setDescription("High performance gaming laptop");
        laptop.setPrice(new BigDecimal("75000.00"));
        laptop.setQuantity(10);
        laptop.setImageUrl("laptop.jpg");
        laptop.onCreate();
        
        Product smartphone = new Product();
        smartphone.setName("Smartphone");
        smartphone.setDescription("Latest Android smartphone");
        smartphone.setPrice(new BigDecimal("45000.00"));
        smartphone.setQuantity(20);
        smartphone.setImageUrl("smartphone.jpg");
        smartphone.onCreate();
        
        Product headphones = new Product();
        headphones.setName("Headphones");
        headphones.setDescription("Noise cancelling wireless headphones");
        headphones.setPrice(new BigDecimal("8500.00"));
        headphones.setQuantity(30);
        headphones.setImageUrl("headphones.jpg");
        headphones.onCreate();
        
        productRepository.save(laptop);
        productRepository.save(smartphone);
        productRepository.save(headphones);
        
        System.out.println("Products initialized");
        return smartphone;
    }

    private Courier initCouriers() {
        Courier expressDelivery = new Courier();
        expressDelivery.setName("Express Delivery");
        expressDelivery.setDescription("Same day delivery");
        expressDelivery.setPricePerKm(new BigDecimal("25.00"));
        expressDelivery.setIsCustom(false);
        expressDelivery.onCreate();
        
        Courier standardDelivery = new Courier();
        standardDelivery.setName("Standard Delivery");
        standardDelivery.setDescription("2-3 days delivery");
        standardDelivery.setPricePerKm(new BigDecimal("15.00"));
        standardDelivery.setIsCustom(false);
        standardDelivery.onCreate();
        
        Courier economyDelivery = new Courier();
        economyDelivery.setName("Economy Delivery");
        economyDelivery.setDescription("5-7 days delivery");
        economyDelivery.setPricePerKm(new BigDecimal("10.00"));
        economyDelivery.setIsCustom(false);
        economyDelivery.onCreate();
        
        Courier customDelivery = new Courier();
        customDelivery.setName("Other");
        customDelivery.setDescription("Custom courier service");
        customDelivery.setPricePerKm(new BigDecimal("20.00"));
        customDelivery.setIsCustom(true);
        customDelivery.onCreate();
        
        courierRepository.save(expressDelivery);
        courierRepository.save(standardDelivery);
        courierRepository.save(economyDelivery);
        courierRepository.save(customDelivery);
        
        System.out.println("Couriers initialized");
        return expressDelivery;
    }

    private Order initOrders(User customer, Product smartphone, Courier expressDelivery) {
        Order order = new Order();
        order.setCustomer(customer);
        order.setProduct(smartphone);
        order.setCourier(expressDelivery);
        order.setQuantity(1);
        order.setAmount(smartphone.getPrice().add(expressDelivery.getPricePerKm().multiply(new BigDecimal("10"))));
        order.setStatus(Order.OrderStatus.DELIVERED);
        order.setOrderDate(LocalDateTime.now().minusDays(30));
        order.onCreate();
        
        orderRepository.save(order);
        
        System.out.println("Orders initialized");
        return order;
    }

    private void initPayments(Order order) {
        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setPaymentMode(Payment.PaymentMode.CARD);
        payment.setPaymentAmount(order.getAmount());
        payment.setStatus(Payment.PaymentStatus.COMPLETED);
        payment.setPaymentDate(order.getOrderDate());
        payment.setTransactionId("TXN" + Math.floor(Math.random() * 1000000));
        payment.onCreate();
        
        paymentRepository.save(payment);
        
        System.out.println("Payments initialized");
    }
}
