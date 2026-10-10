package com.cseintellilearnapi.repository;

import com.cseintellilearnapi.entity.Doubt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoubtRepository extends JpaRepository<Doubt, Long> {
    List<Doubt> findAllByOrderByCreatedAtDesc();
    List<Doubt> findByStudentIdOrderByCreatedAtDesc(Long studentId);
}
