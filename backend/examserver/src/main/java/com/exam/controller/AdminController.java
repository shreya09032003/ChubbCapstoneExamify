package com.exam.controller;

import com.exam.dto.NotificationRequest;
import com.exam.model.Notification;
import com.exam.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/send-notification")
    public String sendNotification(@RequestBody NotificationRequest notificationRequest) {
        Notification notification = new Notification();
        notification.setSubject(notificationRequest.getSubject());
        notification.setDescription(notificationRequest.getDescription());
        notification.setRole(notificationRequest.getRole());
        notification.setTimestamp(LocalDateTime.now()); // Set the timestamp

        // Save the notification
        notificationService.saveNotification(notification);
        return "Notification sent successfully!";
    }


//    @GetMapping("/notifications/{role}")
//    @CrossOrigin("*")
//    public List<Notification> getNotificationsByRole(@RequestParam String role) {
//        // Fetch the notifications based on the role
//        return notificationService.getNotificationsByRole(role);
//    }

}
