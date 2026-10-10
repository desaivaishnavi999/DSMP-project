package com.cseintellilearnapi.repository;

import com.cseintellilearnapi.entity.Semester;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SemesterRepository extends JpaRepository<Semester, Long> {
    List<Semester> findByYearIdOrderBySemesterNumberAsc(Long yearId);
}
