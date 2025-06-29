package com.example.KhataWeb.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Entity
@Data
@Getter
@Setter
public class Product {
    @Id
        @GeneratedValue(strategy= GenerationType.IDENTITY)
        private Long id;

        private String name;
        private double basePrice;
        private String description;
        private Long quantity;

}
