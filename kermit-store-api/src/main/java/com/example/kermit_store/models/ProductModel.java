package com.example.kermit_store.models;

import com.example.kermit_store.enums.CategoryEnum;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "TB_PRODUCT")
public class ProductModel {
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