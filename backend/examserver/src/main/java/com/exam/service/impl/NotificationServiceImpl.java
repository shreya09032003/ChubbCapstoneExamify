package com.exam.service.impl;

import com.exam.model.Notification;
import com.exam.repo.NotificationRepository;
import com.exam.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public List<Notification> getNotificationsByRole(String role) {
        // Call the repository method to fetch notifications based on the role
        return notificationRepository.findByRoleOrBoth(role);
    }
    @Override
    public void saveNotification(Notification notification) {
        notificationRepository.save(notification);
    }

}
