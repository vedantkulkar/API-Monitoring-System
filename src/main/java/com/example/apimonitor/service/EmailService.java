package com.example.apimonitor.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendAlert(String apiName, String url) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("yourgmail@gmail.com");
        message.setSubject("API DOWN ALERT 🚨");
        message.setText("API " + apiName + " is DOWN!\nURL: " + url);

        mailSender.send(message);
    }
}