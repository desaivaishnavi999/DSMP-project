package com.cseintellilearnapi.controller;

import com.cseintellilearnapi.entity.Doubt;
import com.cseintellilearnapi.repository.DoubtRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/doubts")
public class DoubtController {

    private final DoubtRepository doubtRepository;

    public DoubtController(DoubtRepository doubtRepository) {
        this.doubtRepository = doubtRepository;
    }

    @GetMapping
    public ResponseEntity<List<Doubt>> getAllDoubts() {
        return ResponseEntity.ok(doubtRepository.findAllByOrderByCreatedAtDesc());
    }

    @GetMapping("/student/{student_id}")
    public ResponseEntity<List<Doubt>> getDoubtsByStudent(@PathVariable("student_id") Long studentId) {
        return ResponseEntity.ok(doubtRepository.findByStudentIdOrderByCreatedAtDesc(studentId));
    }

    @PostMapping
    public ResponseEntity<?> submitDoubt(@RequestBody Doubt doubt) {
        if (doubt.getStudentId() == null || doubt.getTitle() == null || doubt.getQuestion() == null) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Student, title and question are required"));
        }

        doubt.setStatus("Waiting for Answer");
        Doubt saved = doubtRepository.save(doubt);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "success", true,
                "message", "Doubt submitted successfully",
                "doubt_id", saved.getDoubtId()
        ));
    }

    @PutMapping("/{doubt_id}/answer")
    public ResponseEntity<?> answerDoubt(@PathVariable("doubt_id") Long doubtId, @RequestBody Map<String, Object> body) {
        String answer = (String) body.get("answer");
        Object teacherIdObj = body.get("teacher_id");
        if (teacherIdObj == null) {
            teacherIdObj = body.get("teacherId");
        }

        if (answer == null || teacherIdObj == null) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Answer and teacher are required"));
        }

        Long teacherId = Long.parseLong(teacherIdObj.toString());

        return doubtRepository.findById(doubtId).map(doubt -> {
            doubt.setAnswer(answer);
            doubt.setTeacherId(teacherId);
            doubt.setStatus("Answered");
            doubt.setAnsweredAt(LocalDateTime.now());
            doubtRepository.save(doubt);
            return ResponseEntity.ok(Map.of("success", true, "message", "Doubt answered successfully"));
        }).orElseGet(() -> ResponseEntity.status(404).body(Map.of("success", false, "message", "Doubt not found")));
    }
}
