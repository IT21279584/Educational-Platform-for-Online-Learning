package com.example.notification.service;


import com.example.notification.constants.UserConstants;
import com.example.notification.entity.User;
import com.example.notification.exception.ResourceNotFoundException;
import com.example.notification.exception.UserAlreadyExistsException;
import com.example.notification.mapper.UserMapper;
import com.example.notification.payload.EmailDetails;
import com.example.notification.payload.RequestDto;
import com.example.notification.payload.UserDetailsDto;
import com.example.notification.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailServiceImpl emailService;
    @Override
    public void registerUser(RequestDto requestDto) {
        if(userRepository.existsByEmail(requestDto.getEmail()))
            throw new UserAlreadyExistsException(UserConstants.USER_ALREADY_EXISTS);
        User user = UserMapper.mapToUser(new User(),requestDto);
        emailService.sendEmail(EmailDetails.builder()
                        .messageBody("Welcome to your learning program. \nHi, "+requestDto.getEmail() +"Congratulations! \nYou've joined LearnNV - that's big step, and we're excited for you. Browse the courses available to you and begin your career development now.")
                        .recipient(requestDto.getEmail())
                        .subject("REGISTRATION SUCCESS")
                .build());
        userRepository.save(user);
    }

    @Override
    public UserDetailsDto getUserByEmail(String email) {
        if(!userRepository.existsByEmail(email))
            throw new ResourceNotFoundException(UserConstants.USER_NOT_FOUND);
        User user = userRepository.findByEmail(email);
        return UserMapper.mapToUserDetails(new UserDetailsDto(),user);
    }

    @Override
    public List<UserDetailsDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        if(users.isEmpty())
            throw new ResourceNotFoundException(UserConstants.USER_NOT_FOUND);
        List<UserDetailsDto> userDetailsDtos = new ArrayList<>();
        users.forEach(user -> userDetailsDtos.add(UserMapper.mapToUserDetails(new UserDetailsDto(),user)));
        return userDetailsDtos;
    }

    @Transactional
    @Override
    public boolean updateUser(RequestDto requestDto) {
        if(!userRepository.existsByEmail(requestDto.getEmail()))
            throw new ResourceNotFoundException(UserConstants.USER_NOT_FOUND);
        User user = userRepository.findByEmail(requestDto.getEmail());
        User updatedUser = UserMapper.mapToUser(user,requestDto);
        userRepository.save(updatedUser);
        return true;
    }

    @Transactional
    @Override
    public boolean deleteUser(String email) {
        if(!userRepository.existsByEmail(email))
            throw new ResourceNotFoundException(UserConstants.USER_NOT_FOUND);
        userRepository.deleteByEmail(email);
        return true;
    }
}
