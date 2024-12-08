//package com.exam.service.impl;
//
//import com.exam.service.EmailService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.mail.javamail.MimeMessageHelper;
//
//public class EmailServiceImpl implements EmailService {
//    @Autowired
//    private JavaMailSender mailSender;
//
//    public void sendVerificationEmail(String to, String token) {
//        String subject = "Email Verification";
//        String body = "<html><body><p>Click the link below to verify your email:</p>"
//                + "<a href=\"http://localhost:8080/api/auth/verify-email?token=" + token + "\">Verify Email</a></body></html>";
//
//        try {
//            MimeMessageHelper helper = new MimeMessageHelper(mailSender.createMimeMessage());
//            helper.setFrom("your-email@gmail.com");
//            helper.setTo(to);
//            helper.setSubject(subject);
//            helper.setText(body, true);  // true indicates HTML content
//            mailSender.send(helper.getMimeMessage());
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
//}
