package com.example.EmailService.Controller;

import com.example.EmailService.Dto.ReceiptEmailEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaListnerService {

    @Autowired
    private EmailService emailService;

    @KafkaListener(topics = "receipt-email", groupId = "khataweb-group", containerFactory = "kafkaListenerContainerFactory")
    public void handleEmailEvent(ReceiptEmailEvent event) {
        System.out.println("📩 Consumed event from Kafka: " + event.getTo());
        emailService.sendSimpleEmail(event.getTo(), event.getSubject(), event.getBody());
    }
}
