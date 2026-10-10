package com.cseintellilearnapi.controller;

import com.cseintellilearnapi.entity.PreviousYearQuestion;
import com.cseintellilearnapi.repository.PreviousYearQuestionRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/pyqs")
public class PyqController {

    private final PreviousYearQuestionRepository pyqRepository;

    public PyqController(PreviousYearQuestionRepository pyqRepository) {
        this.pyqRepository = pyqRepository;
    }

    @GetMapping("/{subject_id}")
    public ResponseEntity<List<PreviousYearQuestion>> getPyqsBySubject(@PathVariable("subject_id") Long subjectId) {
        return ResponseEntity.ok(pyqRepository.findBySubjectIdOrderByExamYearDesc(subjectId));
    }

    @PostMapping
    public ResponseEntity<?> addPyq(@RequestBody PreviousYearQuestion pyq) {
        if (pyq.getSubjectId() == null || pyq.getExamYear() == null) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Subject and exam year are required"));
        }

        PreviousYearQuestion saved = pyqRepository.save(pyq);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "success", true,
                "message", "PYQ added successfully",
                "pyq_id", saved.getPyqId()
        ));
    }
}
