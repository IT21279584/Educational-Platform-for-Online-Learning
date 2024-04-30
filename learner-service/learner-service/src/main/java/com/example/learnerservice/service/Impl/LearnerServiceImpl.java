package com.example.learnerservice.service.Impl;

import com.example.learnerservice.entity.Learner;
import com.example.learnerservice.repository.LearnerRepository;
import com.example.learnerservice.service.LearnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LearnerServiceImpl implements LearnerService {

    private final LearnerRepository learnerRepository;

    @Autowired
    public LearnerServiceImpl(LearnerRepository learnerRepository) {
        this.learnerRepository = learnerRepository;
    }

    @Override
    public void enrollUser(Long userId, String courseCode) {
        Learner learner = new Learner();
        learner.setUserId(userId);
        learner.setCourseCode(courseCode);
        learnerRepository.save(learner);
    }
}
