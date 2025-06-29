package com.example.KhataWeb.Dtos;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReceiptEmailEvent {
    private String to;
    private String subject;
    private String body;

    // Getters, Setters, Constructors
}
