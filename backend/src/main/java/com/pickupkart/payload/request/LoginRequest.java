
package com.pickupkart.payload.request;

import lombok.Data;

@Data
public class LoginRequest {
    private String loginName;
    private String password;
}
