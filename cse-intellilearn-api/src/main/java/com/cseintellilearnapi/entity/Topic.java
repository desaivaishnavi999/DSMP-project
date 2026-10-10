package com.cseintellilearnapi.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "topics")
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "topic_id")
    private Long topicId;

    @Column(name = "unit_id", nullable = false)
    private Long unitId;

    @Column(name = "topic_number")
    private Integer topicNumber;

    @Column(name = "topic_name", nullable = false)
    private String topicName;

    public Topic() {
    }

    public Topic(Long topicId, Long unitId, Integer topicNumber, String topicName) {
        this.topicId = topicId;
        this.unitId = unitId;
        this.topicNumber = topicNumber;
        this.topicName = topicName;
    }

    public Long getTopicId() {
        return topicId;
    }

    public void setTopicId(Long topicId) {
        this.topicId = topicId;
    }

    public Long getUnitId() {
        return unitId;
    }

    public void setUnitId(Long unitId) {
        this.unitId = unitId;
    }

    public Integer getTopicNumber() {
        return topicNumber;
    }

    public void setTopicNumber(Integer topicNumber) {
        this.topicNumber = topicNumber;
    }

    public String getTopicName() {
        return topicName;
    }

    public void setTopicName(String topicName) {
        this.topicName = topicName;
    }
}
