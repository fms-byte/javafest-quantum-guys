package com.quantumguys.janun.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Async
    public void sendEmail(String to, String subject, String text) {
       try {
            System.out.println("Sending email to: " + to);
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("Janun Team<asfi@itrrc.com>");
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            javaMailSender.send(message);

       } catch (Exception e) {
            System.out.println("Error sending email: " + e.getMessage());
       }
    }

    public void sendConfirmationEmail(String to, String token) {
        String subject = "Confirm your email";
        String text = "Click the link below to confirm your email\n\n" + "http://localhost:3000/auth/confirm?token=" + token;
        sendEmail(to, subject, text);
    }

     public void sendPasswordResetEmail(String to, String token) {
        String subject = "Reset your password";
        String text = "Click the link below to reset your password\n\n" + "http://localhost:3000/auth/reset-password?token=" + token;
        sendEmail(to, subject, text);
     }

}
