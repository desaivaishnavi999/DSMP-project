package com.cseintellilearnapi.repository;

import com.cseintellilearnapi.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findBySubmissionIdOrderByReviewedAtDesc(Long submissionId);
}
