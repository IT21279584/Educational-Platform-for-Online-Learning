package com.example.courseservice.dto;

import lombok.Data;

@Data
public class UserDTO {
    private Integer userId;
    private String email;
    private String username;
    private String userCode;
}