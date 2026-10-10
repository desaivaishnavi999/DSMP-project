package com.cseintellilearnapi.repository;

import com.cseintellilearnapi.entity.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findAllByOrderByCreatedAtDesc();
    List<Assignment> findByTopicIdOrderByCreatedAtDesc(Long topicId);
}
