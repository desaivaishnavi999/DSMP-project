package com.cseintellilearnapi.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "previous_year_questions")
public class PreviousYearQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pyq_id")
    private Long pyqId;

    @Column(name = "subject_id", nullable = false)
    private Long subjectId;

    @Column(name = "topic_id")
    private Long topicId;

    @Column(name = "exam_year", nullable = false)
    private Integer examYear;

    private String title;

    @Column(name = "file_url")
    private String fileUrl;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "uploaded_by")
    private Long uploadedBy;

    @Column(name = "uploaded_at", nullable = false, updatable = false)
    private LocalDateTime uploadedAt;

    public PreviousYearQuestion() {
    }

    public PreviousYearQuestion(Long pyqId, Long subjectId, Long topicId, Integer examYear, String title, String fileUrl, String fileName, Long uploadedBy, LocalDateTime uploadedAt) {
        this.pyqId = pyqId;
        this.subjectId = subjectId;
        this.topicId = topicId;
        this.examYear = examYear;
        this.title = title;
        this.fileUrl = fileUrl;
        this.fileName = fileName;
        this.uploadedBy = uploadedBy;
        this.uploadedAt = uploadedAt;
    }

    @PrePersist
    protected void onCreate() {
        if (this.uploadedAt == null) {
            this.uploadedAt = LocalDateTime.now();
        }
    }

    public Long getPyqId() {
        return pyqId;
    }

    public void setPyqId(Long pyqId) {
        this.pyqId = pyqId;
    }

    public Long getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(Long subjectId) {
        this.subjectId = subjectId;
    }

    public Long getTopicId() {
        return topicId;
    }

    public void setTopicId(Long topicId) {
        this.topicId = topicId;
    }

    public Integer getExamYear() {
        return examYear;
    }

    public void setExamYear(Integer examYear) {
        this.examYear = examYear;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public Long getUploadedBy() {
        return uploadedBy;
    }

    public void setUploadedBy(Long uploadedBy) {
        this.uploadedBy = uploadedBy;
    }

    public LocalDateTime getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(LocalDateTime uploadedAt) {
        this.uploadedAt = uploadedAt;
    }
}
