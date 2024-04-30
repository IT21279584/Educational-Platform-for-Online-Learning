// LearnerRepository.java
package com.example.learnerservice.repository;

import com.example.learnerservice.entity.Learner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LearnerRepository extends JpaRepository<Learner, Long> {
}
