package com.example.notification.mapper;


import com.example.notification.entity.User;
import com.example.notification.payload.RequestDto;
import com.example.notification.payload.UserDetailsDto;

public class UserMapper {

    public static User mapToUser(User user, RequestDto requestDto){
        user.setUserId(requestDto.getUserId());
        user.setCourseId(requestDto.getCourseId());
        user.setEmail(requestDto.getEmail());

        return user;
    }

    public static UserDetailsDto mapToUserDetails(UserDetailsDto userDetailsDto, User user){
        userDetailsDto.setUserId(user.getUserId());
        userDetailsDto.setCourseId(user.getCourseId());
        userDetailsDto.setEmail(user.getEmail());
        return userDetailsDto;
    }
}
