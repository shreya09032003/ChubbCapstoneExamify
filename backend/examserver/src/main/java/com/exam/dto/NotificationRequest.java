package com.exam.dto;

public class NotificationRequest {

    private String subject;
    private String description;
    private String role; // "normal", "teacher", or "both"

    // Getters and Setters

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
