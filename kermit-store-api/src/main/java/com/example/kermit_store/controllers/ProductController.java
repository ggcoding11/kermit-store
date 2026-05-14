package com.example.kermit_store.controllers;

import com.example.kermit_store.dtos.ProductCreateDTO;
import com.example.kermit_store.dtos.ProductResponseDTO;
import com.example.kermit_store.dtos.ProductUpdateDTO;
import com.example.kermit_store.services.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<List<ProductResponseDTO>> listarTodos(
      @RequestParam(defaultValue = "id") String field,
      @RequestParam(defaultValue = "asc") String direction
    ) {
        List<ProductResponseDTO> request = service.listarTodos(field, direction);

        return ResponseEntity.status(HttpStatus.OK).body(request);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> listarPorId(@PathVariable Long id) {
        ProductResponseDTO request = service.listarPorId(id);

        return ResponseEntity.status(HttpStatus.OK).body(request);
    }

    @PostMapping
    public ResponseEntity<ProductResponseDTO> criar(@ModelAttribute @Valid ProductCreateDTO product) {
        ProductResponseDTO request = service.criar(product);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(request.getId()).toUri();

        return ResponseEntity.created(uri).body(request);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> atualizar(@PathVariable Long id, @ModelAttribute @Valid ProductUpdateDTO product) {
        ProductResponseDTO request = service.atualizar(id, product);

        return ResponseEntity.status(HttpStatus.OK).body(request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        service.deletar(id);

        return ResponseEntity.noContent().build();
    }
}
