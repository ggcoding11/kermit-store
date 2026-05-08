package com.example.kermit_store.controller;

import com.example.kermit_store.dto.ProductCreateDTO;
import com.example.kermit_store.dto.ProductResponseDTO;
import com.example.kermit_store.dto.ProductUpdateDTO;
import com.example.kermit_store.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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

    @GetMapping("/images/{fileName}")
    public ResponseEntity<Resource> getImage(@PathVariable String fileName) {
        try {
            Path path = Paths.get("images").resolve(fileName);

            Resource resource = new UrlResource(path.toUri());

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok()
                    .header("Content-Type", Files.probeContentType(path))
                    .body(resource);

        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<ProductResponseDTO> criar(@ModelAttribute @Valid ProductCreateDTO product) {
        ProductResponseDTO request = service.criar(product);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(request.getId()).toUri();

        return ResponseEntity.created(uri).body(request);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> atualizar(@PathVariable Long id, @RequestBody ProductUpdateDTO product) {
        ProductResponseDTO request = service.atualizar(id, product);

        return ResponseEntity.status(HttpStatus.OK).body(request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        service.deletar(id);

        return ResponseEntity.noContent().build();
    }
}
