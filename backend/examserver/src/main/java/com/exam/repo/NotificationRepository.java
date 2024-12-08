package com.exam.repo;

import com.exam.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    // Custom query using OR condition
    @Query("SELECT n FROM Notification n WHERE n.role = :role or n.role = 'BOTH'")
    List<Notification> findByRoleOrBoth(String role);
}
