package com.example.notification.controller;


import com.example.notification.constants.UserConstants;
import com.example.notification.payload.RequestDto;
import com.example.notification.payload.ResponseDto;
import com.example.notification.payload.UserDetailsDto;
import com.example.notification.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notification")
public class UserController {
    @Autowired
    private UserService userService;

    @PutMapping("/send")
    public ResponseEntity<ResponseDto> registerUser(@RequestBody RequestDto requestDto){
        userService.registerUser(requestDto);
        return new ResponseEntity<>(ResponseDto.builder()
                .statusCode(HttpStatus.CREATED.toString())
                .statusMsg(UserConstants.REGISTRATION_SUCCESS)
                .build(), HttpStatus.OK);
    }

    @PutMapping("/enroll")
    public ResponseEntity<ResponseDto> enrollUser(@RequestBody RequestDto requestDto){
        userService.enrollUser(requestDto);
        return new ResponseEntity<>(ResponseDto.builder()
                .statusCode(HttpStatus.CREATED.toString())
                .statusMsg(UserConstants.ENROLL_SUCCESS)
                .build(), HttpStatus.OK);
    }

    @GetMapping("/getbyemail/{email}")
    public ResponseEntity<UserDetailsDto> getUserByEmail(@PathVariable String email){
        return new ResponseEntity<>(userService.getUserByEmail(email),HttpStatus.OK);
    }

    @GetMapping("/getall")
    public ResponseEntity<List<UserDetailsDto>> getAllUsers(){
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<ResponseDto> updateUser(RequestDto requestDto){
        boolean isUpdated = userService.updateUser(requestDto);
        if (!isUpdated)
            return new ResponseEntity<>(ResponseDto.builder()
                    .statusCode(HttpStatus.EXPECTATION_FAILED.toString())
                    .statusMsg(UserConstants.UPDATE_FAILED)
                    .build(),HttpStatus.EXPECTATION_FAILED);
        return new ResponseEntity<>(ResponseDto.builder()
                .statusMsg(UserConstants.UPDATE_SUCCESS)
                .statusCode(HttpStatus.OK.toString())
                .build(),HttpStatus.OK);
    }

    @DeleteMapping("/delete/{email}")
    public ResponseEntity<ResponseDto> deleteUser(@PathVariable String email){
        boolean isDeleted = userService.deleteUser(email);
        if (!isDeleted)
            return new ResponseEntity<>(ResponseDto.builder()
                    .statusCode(HttpStatus.EXPECTATION_FAILED.toString())
                    .statusMsg(UserConstants.DELETION_FAILED)
                    .build(),HttpStatus.EXPECTATION_FAILED);
        return new ResponseEntity<>(ResponseDto.builder()
                .statusMsg(UserConstants.DELETION_SUCCESS)
                .statusCode(HttpStatus.OK.toString())
                .build(),HttpStatus.OK);
    }
}
