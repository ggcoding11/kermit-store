package com.example.kermit_store.dtos;
import com.example.kermit_store.enums.CategoryEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;

@Getter
public class ProductUpdateDTO {
    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Brand is required")
    private String brand;

    @NotNull(message = "Price is required")
    private Double price;

    @NotNull(message = "Category is required")
    private CategoryEnum category;

    @NotBlank(message = "Image name is required")
    private String imageName;

    @NotNull(message = "Quantity is required")
    @PositiveOrZero(message = "Quantity cannot be less than 0")
    private Integer quantity;

    @NotBlank(message = "Description is required")
    private String description;
}
