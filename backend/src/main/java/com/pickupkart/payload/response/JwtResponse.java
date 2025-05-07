
package com.pickupkart.payload.response;

import lombok.Data;

@Data
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String id;
    private String fullName;
    private String loginName;
    private String email;
    private String mobile;
    private String address;
    private String role;

    public JwtResponse(String accessToken, String id, String fullName, String loginName, String email, String mobile, String address, String role) {
        this.token = accessToken;
        this.id = id;
        this.fullName = fullName;
        this.loginName = loginName;
        this.email = email;
        this.mobile = mobile;
        this.address = address;
        this.role = role;
    }
}
