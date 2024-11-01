package com.example.notification.repository;


import com.example.notification.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    boolean existsByEmail(String email);

    User findByEmail(String email);

    void deleteByEmail(String email);
}
