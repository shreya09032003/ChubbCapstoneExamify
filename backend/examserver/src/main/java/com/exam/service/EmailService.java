package com.exam.service;

public interface EmailService {
    void sendVerificationEmail(String to, String token);
}
