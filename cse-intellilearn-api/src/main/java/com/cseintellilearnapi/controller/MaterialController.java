package com.cseintellilearnapi.controller;

import com.cseintellilearnapi.entity.Material;
import com.cseintellilearnapi.repository.MaterialRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/materials")
public class MaterialController {

    private final MaterialRepository materialRepository;

    public MaterialController(MaterialRepository materialRepository) {
        this.materialRepository = materialRepository;
    }

    @GetMapping("/topic/{topic_id}")
    public ResponseEntity<List<Material>> getMaterialsByTopic(@PathVariable("topic_id") Long topicId) {
        return ResponseEntity.ok(materialRepository.findByTopicIdOrderByUploadedAtDesc(topicId));
    }

    @PostMapping
    public ResponseEntity<?> addMaterial(@RequestBody Material material) {
        if (material.getTopicId() == null || material.getTitle() == null || material.getTitle().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Topic and title are required"));
        }

        Material saved = materialRepository.save(material);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "success", true,
                "message", "Material added successfully",
                "material_id", saved.getMaterialId()
        ));
    }
}
