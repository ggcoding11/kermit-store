package com.example.kermit_store.controllers;

import com.example.kermit_store.dtos.ProductCreateDTO;
import com.example.kermit_store.dtos.ProductResponseDTO;
import com.example.kermit_store.dtos.ProductUpdateDTO;
import com.example.kermit_store.services.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private ProductService service;

    @GetMapping
    public ResponseEntity<Page<ProductResponseDTO>> findAll(
            @RequestParam(required = false) String searchParam,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "asc") String sortDirection
    ) {
        Page<ProductResponseDTO> request = service.findAll(searchParam, pageNumber, pageSize, sortField, sortDirection);

        return ResponseEntity.status(HttpStatus.OK).body(request);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> findById(@PathVariable Long id) {
        ProductResponseDTO request = service.findById(id);

        return ResponseEntity.status(HttpStatus.OK).body(request);
    }

    @PostMapping
    public ResponseEntity<ProductResponseDTO> save(@ModelAttribute @Valid ProductCreateDTO product) {
        ProductResponseDTO request = service.save(product);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(request.getId()).toUri();

        return ResponseEntity.created(uri).body(request);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> update(
            @PathVariable Long id, @ModelAttribute @Valid ProductUpdateDTO product
    ) {
        ProductResponseDTO request = service.update(id, product);

        return ResponseEntity.status(HttpStatus.OK).body(request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.deletar(id);

        return ResponseEntity.noContent().build();
    }
}
