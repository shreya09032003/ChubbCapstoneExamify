package com.exam.service;

import com.exam.model.Notification;
import java.util.List;

public interface NotificationService {
    List<Notification> getNotificationsByRole(String role);

    public void saveNotification(Notification notification);
}
