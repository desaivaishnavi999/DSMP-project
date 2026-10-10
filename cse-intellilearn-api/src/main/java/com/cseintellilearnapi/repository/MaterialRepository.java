package com.cseintellilearnapi.repository;

import com.cseintellilearnapi.entity.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaterialRepository extends JpaRepository<Material, Long> {
    List<Material> findByTopicIdOrderByUploadedAtDesc(Long topicId);
}
