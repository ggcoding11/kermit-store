package com.example.kermit_store.controllers;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/images")
public class ImageController {
    @GetMapping("/{fileName}")
    public ResponseEntity<Resource> findByName(@PathVariable String fileName) {
        try {
            Path imagePath = Paths.get("images").resolve(fileName);

            Resource imageFile = new UrlResource(imagePath.toUri());

            if (!imageFile.exists()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok().header(
                    "Content-Type", Files.probeContentType(imagePath)
            ).body(imageFile);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
