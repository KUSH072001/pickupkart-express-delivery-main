
package com.pickupkart.payload.request;

import lombok.Data;

@Data
public class RegisterRequest {
    private String fullName;
    private String loginName;
    private String password;
    private String email;
    private String mobile;
    private String address;
    private String role;
}
