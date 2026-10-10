package com.cseintellilearnapi.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "semesters")
public class Semester {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "semester_id")
    private Long semesterId;

    @Column(name = "year_id", nullable = false)
    private Long yearId;

    @Column(name = "semester_number", nullable = false)
    private Integer semesterNumber;

    @Column(name = "semester_name")
    private String semesterName;

    public Semester() {
    }

    public Semester(Long semesterId, Long yearId, Integer semesterNumber, String semesterName) {
        this.semesterId = semesterId;
        this.yearId = yearId;
        this.semesterNumber = semesterNumber;
        this.semesterName = semesterName;
    }

    public Long getSemesterId() {
        return semesterId;
    }

    public void setSemesterId(Long semesterId) {
        this.semesterId = semesterId;
    }

    public Long getYearId() {
        return yearId;
    }

    public void setYearId(Long yearId) {
        this.yearId = yearId;
    }

    public Integer getSemesterNumber() {
        return semesterNumber;
    }

    public void setSemesterNumber(Integer semesterNumber) {
        this.semesterNumber = semesterNumber;
    }

    public String getSemesterName() {
        return semesterName;
    }

    public void setSemesterName(String semesterName) {
        this.semesterName = semesterName;
    }
}
