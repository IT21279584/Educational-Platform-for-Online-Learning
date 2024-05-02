package com.example.learnerservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnrollmentId implements Serializable {
    private Integer userId;
    private Integer courseId;
}
