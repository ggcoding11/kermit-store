package com.example.kermit_store.model;

import com.example.kermit_store.enums.CategoryEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String brand;
    private Double price;
    @Enumerated(EnumType.STRING)
    private CategoryEnum category;
    private String imageName;
    private LocalDate creationDate;
    private Integer quantity;
    private String description;
}