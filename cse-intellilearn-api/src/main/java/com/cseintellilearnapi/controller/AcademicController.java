package com.cseintellilearnapi.controller;

import com.cseintellilearnapi.entity.*;
import com.cseintellilearnapi.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class AcademicController {

    private final AcademicYearRepository yearRepository;
    private final SemesterRepository semesterRepository;
    private final SubjectRepository subjectRepository;
    private final UnitRepository unitRepository;
    private final TopicRepository topicRepository;

    public AcademicController(AcademicYearRepository yearRepository,
                              SemesterRepository semesterRepository,
                              SubjectRepository subjectRepository,
                              UnitRepository unitRepository,
                              TopicRepository topicRepository) {
        this.yearRepository = yearRepository;
        this.semesterRepository = semesterRepository;
        this.subjectRepository = subjectRepository;
        this.unitRepository = unitRepository;
        this.topicRepository = topicRepository;
    }

    @GetMapping("/years")
    public ResponseEntity<List<AcademicYear>> getAllYears() {
        return ResponseEntity.ok(yearRepository.findAllByOrderByYearIdAsc());
    }

    @GetMapping("/semesters/{year_id}")
    public ResponseEntity<List<Semester>> getSemestersByYear(@PathVariable("year_id") Long yearId) {
        return ResponseEntity.ok(semesterRepository.findByYearIdOrderBySemesterNumberAsc(yearId));
    }

    @GetMapping("/subjects/{semester_id}")
    public ResponseEntity<List<Subject>> getSubjectsBySemester(@PathVariable("semester_id") Long semesterId) {
        return ResponseEntity.ok(subjectRepository.findBySemesterIdOrderBySubjectIdAsc(semesterId));
    }

    @GetMapping("/units/{subject_id}")
    public ResponseEntity<List<Unit>> getUnitsBySubject(@PathVariable("subject_id") Long subjectId) {
        return ResponseEntity.ok(unitRepository.findBySubjectIdOrderByUnitNumberAsc(subjectId));
    }

    @GetMapping("/topics/{unit_id}")
    public ResponseEntity<List<Topic>> getTopicsByUnit(@PathVariable("unit_id") Long unitId) {
        return ResponseEntity.ok(topicRepository.findByUnitIdOrderByTopicNumberAsc(unitId));
    }

    @GetMapping("/topic/{topic_id}")
    public ResponseEntity<?> getTopicById(@PathVariable("topic_id") Long topicId) {
        return topicRepository.findById(topicId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404).body(null));
    }
}
