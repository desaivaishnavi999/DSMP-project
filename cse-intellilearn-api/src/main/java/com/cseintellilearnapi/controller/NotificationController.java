package com.cseintellilearnapi.controller;

import com.cseintellilearnapi.entity.Notification;
import com.cseintellilearnapi.repository.NotificationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController {

    private final NotificationRepository notificationRepository;

    public NotificationController(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @GetMapping("/{user_id}")
    public ResponseEntity<List<Notification>> getNotificationsByUser(@PathVariable("user_id") Long userId) {
        return ResponseEntity.ok(notificationRepository.findByUserIdOrderByCreatedAtDesc(userId));
    }

    @PostMapping
    public ResponseEntity<?> createNotification(@RequestBody Notification notification) {
        if (notification.getUserId() == null || notification.getTitle() == null || notification.getMessage() == null) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "User, title and message are required"));
        }

        Notification saved = notificationRepository.save(notification);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "success", true,
                "message", "Notification created successfully",
                "notification_id", saved.getNotificationId()
        ));
    }

    @PutMapping("/{notification_id}/read")
    public ResponseEntity<?> markAsRead(@PathVariable("notification_id") Long notificationId) {
        return notificationRepository.findById(notificationId).map(notif -> {
            notif.setIsRead(true);
            notificationRepository.save(notif);
            return ResponseEntity.ok(Map.of("success", true, "message", "Notification marked as read"));
        }).orElseGet(() -> ResponseEntity.status(404).body(Map.of("success", false, "message", "Notification not found")));
    }
}
