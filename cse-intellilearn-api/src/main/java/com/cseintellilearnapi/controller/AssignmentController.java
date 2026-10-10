package com.cseintellilearnapi.controller;

import com.cseintellilearnapi.entity.Assignment;
import com.cseintellilearnapi.entity.AssignmentSubmission;
import com.cseintellilearnapi.entity.Feedback;
import com.cseintellilearnapi.repository.AssignmentRepository;
import com.cseintellilearnapi.repository.AssignmentSubmissionRepository;
import com.cseintellilearnapi.repository.FeedbackRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class AssignmentController {

    private final AssignmentRepository assignmentRepository;
    private final AssignmentSubmissionRepository submissionRepository;
    private final FeedbackRepository feedbackRepository;

    public AssignmentController(AssignmentRepository assignmentRepository,
                                AssignmentSubmissionRepository submissionRepository,
                                FeedbackRepository feedbackRepository) {
        this.assignmentRepository = assignmentRepository;
        this.submissionRepository = submissionRepository;
        this.feedbackRepository = feedbackRepository;
    }

    // --- ASSIGNMENTS ---

    @GetMapping("/assignments")
    public ResponseEntity<List<Assignment>> getAllAssignments() {
        return ResponseEntity.ok(assignmentRepository.findAllByOrderByCreatedAtDesc());
    }

    @GetMapping("/assignments/details")
    public ResponseEntity<List<Assignment>> getAssignmentDetails() {
        return ResponseEntity.ok(assignmentRepository.findAllByOrderByCreatedAtDesc());
    }

    @GetMapping("/assignments/topic/{topic_id}")
    public ResponseEntity<List<Assignment>> getAssignmentsByTopic(@PathVariable("topic_id") Long topicId) {
        return ResponseEntity.ok(assignmentRepository.findByTopicIdOrderByCreatedAtDesc(topicId));
    }

    @PostMapping("/assignments")
    public ResponseEntity<?> createAssignment(@RequestBody Assignment assignment) {
        if (assignment.getTitle() == null || assignment.getSubjectId() == null ||
            assignment.getTeacherId() == null || assignment.getDueDate() == null) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Title, subject, teacher and due date are required"));
        }

        Assignment saved = assignmentRepository.save(assignment);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "success", true,
                "message", "Assignment created successfully",
                "assignment_id", saved.getAssignmentId()
        ));
    }

    // --- SUBMISSIONS ---

    @GetMapping("/submissions/{assignment_id}")
    public ResponseEntity<List<AssignmentSubmission>> getSubmissionsByAssignment(@PathVariable("assignment_id") Long assignmentId) {
        return ResponseEntity.ok(submissionRepository.findByAssignmentIdOrderBySubmittedAtDesc(assignmentId));
    }

    @GetMapping("/student-submissions/{student_id}")
    public ResponseEntity<List<AssignmentSubmission>> getStudentSubmissions(@PathVariable("student_id") Long studentId) {
        return ResponseEntity.ok(submissionRepository.findByStudentIdOrderBySubmittedAtDesc(studentId));
    }

    @PostMapping("/submissions")
    public ResponseEntity<?> submitAssignment(@RequestBody AssignmentSubmission submission) {
        if (submission.getAssignmentId() == null || submission.getStudentId() == null) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Assignment and student are required"));
        }

        Optional<AssignmentSubmission> existing = submissionRepository.findByAssignmentIdAndStudentId(
                submission.getAssignmentId(), submission.getStudentId()
        );

        if (existing.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("success", false, "message", "You have already submitted this assignment"));
        }

        submission.setStatus("Submitted");
        AssignmentSubmission saved = submissionRepository.save(submission);

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "success", true,
                "message", "Assignment submitted successfully",
                "submission_id", saved.getSubmissionId()
        ));
    }

    @PutMapping("/submissions/{submission_id}/status")
    public ResponseEntity<?> updateSubmissionStatus(@PathVariable("submission_id") Long submissionId, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        List<String> allowedStatus = List.of("Pending", "Submitted", "Checked");

        if (status == null || !allowedStatus.contains(status)) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Invalid status"));
        }

        return submissionRepository.findById(submissionId).map(sub -> {
            sub.setStatus(status);
            submissionRepository.save(sub);
            return ResponseEntity.ok(Map.of("success", true, "message", "Submission status updated successfully"));
        }).orElseGet(() -> ResponseEntity.status(404).body(Map.of("success", false, "message", "Submission not found")));
    }

    // --- FEEDBACK ---

    @GetMapping("/feedback/submission/{submission_id}")
    public ResponseEntity<List<Feedback>> getFeedbackBySubmission(@PathVariable("submission_id") Long submissionId) {
        return ResponseEntity.ok(feedbackRepository.findBySubmissionIdOrderByReviewedAtDesc(submissionId));
    }

    @PostMapping("/feedback")
    public ResponseEntity<?> addFeedback(@RequestBody Feedback feedback) {
        if (feedback.getSubmissionId() == null || feedback.getTeacherId() == null) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Submission and teacher are required"));
        }

        Feedback saved = feedbackRepository.save(feedback);

        // Mark submission as Checked
        submissionRepository.findById(feedback.getSubmissionId()).ifPresent(sub -> {
            sub.setStatus("Checked");
            submissionRepository.save(sub);
        });

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "success", true,
                "message", "Feedback added and submission checked",
                "feedback_id", saved.getFeedbackId()
        ));
    }
}
