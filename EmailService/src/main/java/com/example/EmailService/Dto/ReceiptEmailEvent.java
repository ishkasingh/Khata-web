package com.example.EmailService.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReceiptEmailEvent {
    // ✅ Add getters and setters
    private String to;
    private String subject;
    private String body;

    // ✅ Required for Jackson deserialization
    public ReceiptEmailEvent() {}

    public ReceiptEmailEvent(String to, String subject, String body) {
        this.to = to;
        this.subject = subject;
        this.body = body;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public void setBody(String body) {
        this.body = body;
    }
}

