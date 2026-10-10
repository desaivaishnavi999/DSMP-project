package com.cseintellilearnapi.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "units")
public class Unit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "unit_id")
    private Long unitId;

    @Column(name = "subject_id", nullable = false)
    private Long subjectId;

    @Column(name = "unit_number", nullable = false)
    private Integer unitNumber;

    @Column(name = "unit_name", nullable = false)
    private String unitName;

    public Unit() {
    }

    public Unit(Long unitId, Long subjectId, Integer unitNumber, String unitName) {
        this.unitId = unitId;
        this.subjectId = subjectId;
        this.unitNumber = unitNumber;
        this.unitName = unitName;
    }

    public Long getUnitId() {
        return unitId;
    }

    public void setUnitId(Long unitId) {
        this.unitId = unitId;
    }

    public Long getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(Long subjectId) {
        this.subjectId = subjectId;
    }

    public Integer getUnitNumber() {
        return unitNumber;
    }

    public void setUnitNumber(Integer unitNumber) {
        this.unitNumber = unitNumber;
    }

    public String getUnitName() {
        return unitName;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }
}
