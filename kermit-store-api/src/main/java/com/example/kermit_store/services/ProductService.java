package com.example.kermit_store.services;
import com.example.kermit_store.dtos.ProductCreateDTO;
import com.example.kermit_store.dtos.ProductResponseDTO;
import com.example.kermit_store.dtos.ProductUpdateDTO;
import com.example.kermit_store.models.Product;
import com.example.kermit_store.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
public class ProductService {
    @Autowired
    private ProductRepository repository;

    public List<ProductResponseDTO> listarTodos(String field, String direction) {
        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(field).descending() : Sort.by(field).ascending();

        List<Product> products = repository.findAll(sort);

        return products.stream().map(product -> toDto(product)).toList();
    }

    public ProductResponseDTO listarPorId(Long id) {
        Product product = repository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));

        return toDto(product);
    }

    public ProductResponseDTO criar (ProductCreateDTO dto) {
        MultipartFile imageFile = dto.getImage();
        String imageName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();

        salvarImagem(imageFile, imageName);

        Product product = toEntity(dto, imageFile.getOriginalFilename());

        return toDto(repository.save(product));
    }

    public void deletar (Long id) {
        repository.deleteById(id);
    }

    public ProductResponseDTO atualizar (Long id, ProductUpdateDTO novo) {
        Product antigo = repository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));

        MultipartFile imageFile = novo.getImage();

        String imageName = antigo.getImageName();

        if (imageFile != null) {
            imageName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();

            String oldImageName = antigo.getImageName();

            salvarImagem(imageFile, imageName);
            deletarImagem(oldImageName);
        }

        antigo.setName(novo.getName());
        antigo.setBrand(novo.getBrand());
        antigo.setPrice(novo.getPrice());
        antigo.setImageName(imageName);
        antigo.setCategory(novo.getCategory());
        antigo.setQuantity(novo.getQuantity());
        antigo.setDescription(novo.getDescription());

        return toDto(repository.save(antigo));
    }

    public ProductResponseDTO toDto(Product product) {
        return new ProductResponseDTO(product.getId(), product.getName(), product.getBrand(), product.getPrice(), product.getCategory(), product.getImageName(), product.getCreationDate(), product.getQuantity(), product.getDescription());
    }

    public Product toEntity(ProductCreateDTO dto, String imageName) {
        Product product = new Product();

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

    public void salvarImagem(MultipartFile imageFile, String imageName) {
        try {
            MultipartFile image = imageFile;
            Path folder = Paths.get("images");

            if (!Files.exists(folder)) {
                Files.createDirectories(folder);
            }

            Files.copy(image.getInputStream(), folder.resolve(imageName), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException("Erro no salvamento da imagem!");
        }
    }

    public void deletarImagem(String imageName) {
        try {
            Path oldImage = Paths.get("images").resolve(imageName);

            Files.deleteIfExists(oldImage);
        } catch (IOException e) {
            throw new RuntimeException("Erro na remoção da imagem!");
        }
    }
}