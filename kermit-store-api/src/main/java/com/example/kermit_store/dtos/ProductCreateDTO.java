package com.example.kermit_store.dtos;

import com.example.kermit_store.enums.CategoryEnum;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Getter
@Setter
public class ProductCreateDTO {
    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Brand is required")
    private String brand;

    @NotNull(message = "Price is required")
    private Double price;

    @NotNull(message = "Category is required")
    private CategoryEnum category;

    @NotNull(message = "Image file is required")
    private MultipartFile image;

    @NotNull(message = "Quantity is required")
    @PositiveOrZero(message = "Quantity cannot be less than 0")
    private Integer quantity;

    @NotBlank(message = "Description is required")
    private String description;
}
