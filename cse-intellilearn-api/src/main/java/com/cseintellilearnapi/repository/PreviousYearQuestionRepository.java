package com.cseintellilearnapi.repository;

import com.cseintellilearnapi.entity.PreviousYearQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PreviousYearQuestionRepository extends JpaRepository<PreviousYearQuestion, Long> {
    List<PreviousYearQuestion> findBySubjectIdOrderByExamYearDesc(Long subjectId);
}
