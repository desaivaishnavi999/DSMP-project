package com.cseintellilearnapi.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "academic_years")
public class AcademicYear {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "year_id")
    private Long yearId;

    @Column(name = "year_name", nullable = false)
    private String yearName;

    public AcademicYear() {
    }

    public AcademicYear(Long yearId, String yearName) {
        this.yearId = yearId;
        this.yearName = yearName;
    }

    public Long getYearId() {
        return yearId;
    }

    public void setYearId(Long yearId) {
        this.yearId = yearId;
    }

    public String getYearName() {
        return yearName;
    }

    public void setYearName(String yearName) {
        this.yearName = yearName;
    }
}
