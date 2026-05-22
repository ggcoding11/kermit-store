package com.example.kermit_store.services;

import com.example.kermit_store.dtos.ProductCreateDTO;
import com.example.kermit_store.dtos.ProductResponseDTO;
import com.example.kermit_store.dtos.ProductUpdateDTO;
import com.example.kermit_store.models.ProductModel;
import com.example.kermit_store.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class ProductService {
    @Autowired
    private ProductRepository repository;

    public Page<ProductResponseDTO> findAll(
            String searchParam, int pageNumber, int pageSize, String sortField, String sortDirection
    ) {
        Sort sortConfiguration = sortDirection.equals("desc") ? Sort.by(sortField).descending() : Sort.by(sortField).ascending();

        Pageable pageConfiguration = PageRequest.of(pageNumber, pageSize, sortConfiguration);

        Page<ProductModel> productPages;

        if (searchParam == null || searchParam.isBlank()) {
            productPages = repository.findAll(pageConfiguration);
        } else {
            productPages = repository.findByNameContainingIgnoreCase(searchParam, pageConfiguration);
        }

        return productPages.map(this::toDto);
    }

    public ProductResponseDTO findById(Long id) {
        ProductModel product = repository.findById(id).orElseThrow(
                () -> new RuntimeException("Product not found")
        );

        return toDto(product);
    }

    public ProductResponseDTO save(ProductCreateDTO dto) {
        MultipartFile imageFile = dto.getImage();
        String imageName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();

        saveImageToApi(imageFile, imageName);

        ProductModel product = toEntity(dto, imageFile.getOriginalFilename());

        return toDto(repository.save(product));
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }

    public ProductResponseDTO update(Long id, ProductUpdateDTO newProduct) {
        ProductModel oldProduct = repository.findById(id).orElseThrow(
                () -> new RuntimeException("Product not found")
        );

        MultipartFile imageFile = newProduct.getImage();

        if (imageFile != null) {
            String newImageName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();

            saveImageToApi(imageFile, newImageName);

            String oldImageName = oldProduct.getImageName();

            deleteImageFromApi(oldImageName);

            oldProduct.setImageName(newImageName);
        }

        oldProduct.setName(newProduct.getName());
        oldProduct.setBrand(newProduct.getBrand());
        oldProduct.setPrice(newProduct.getPrice());
        oldProduct.setCategory(newProduct.getCategory());
        oldProduct.setQuantity(newProduct.getQuantity());
        oldProduct.setDescription(newProduct.getDescription());

        return toDto(repository.save(oldProduct));
    }

    public ProductResponseDTO toDto(ProductModel product) {
        return new ProductResponseDTO(
                product.getId(), product.getName(), product.getBrand(), product.getPrice(),
                product.getCategory(), product.getImageName(), product.getCreationDate(),
                product.getQuantity(), product.getDescription()
        );
    }

    public ProductModel toEntity(ProductCreateDTO dto, String imageName) {
        ProductModel product = new ProductModel();

        product.setName(dto.getName());
        product.setBrand(dto.getBrand());
        product.setQuantity(dto.getQuantity());
        product.setCategory(dto.getCategory());
        product.setPrice(dto.getPrice());
        product.setCreationDate(dto.getCreationDate());
        product.setImageName(imageName);
        product.setDescription(dto.getDescription());

        return product;
    }

    public void saveImageToApi(MultipartFile imageFile, String imageName) {
        try {
            MultipartFile image = imageFile;
            Path folder = Paths.get("images");

            if (!Files.exists(folder)) {
                Files.createDirectories(folder);
            }

            Files.copy(
                    image.getInputStream(), folder.resolve(imageName),
                    StandardCopyOption.REPLACE_EXISTING
            );
        } catch (IOException e) {
            throw new RuntimeException("Failed to save image");
        }
    }

    public void deleteImageFromApi(String imageName) {
        try {
            Path oldImage = Paths.get("images").resolve(imageName);

            Files.deleteIfExists(oldImage);
        } catch (IOException e) {
            throw new RuntimeException("Failed to remove image");
        }
    }
}