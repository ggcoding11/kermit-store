package com.example.kermit_store.service;
import com.example.kermit_store.dto.ProductCreateDTO;
import com.example.kermit_store.dto.ProductResponseDTO;
import com.example.kermit_store.dto.ProductUpdateDTO;
import com.example.kermit_store.exceptions.ResourceNotFoundException;
import com.example.kermit_store.model.Product;
import com.example.kermit_store.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.List;

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
        Product product = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        return toDto(product);
    }

    public ProductResponseDTO criar (ProductCreateDTO dto) {
        Product product = toEntity(dto);

        Product saved = repository.save(product);

        return toDto(saved);
    }

    public void deletar (Long id) {
        repository.deleteById(id);
    }

    public ProductResponseDTO atualizar (Long id, ProductUpdateDTO novo) {
        Product antigo = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        antigo.setName(novo.getName());
        antigo.setBrand(novo.getBrand());
        antigo.setQuantity(novo.getQuantity());
        antigo.setCategory(novo.getCategory());
        antigo.setPrice(novo.getPrice());
        antigo.setImageName(novo.getImageName());
        antigo.setDescription(novo.getDescription());

        return toDto(repository.save(antigo));
    }

    public ProductResponseDTO toDto(Product product) {
        return new ProductResponseDTO(product.getId(), product.getName(), product.getBrand(), product.getPrice(), product.getCategory(), product.getImageName(), product.getCreationDate(), product.getQuantity(), product.getDescription());
    }

    public Product toEntity(ProductCreateDTO dto) {
        Product product = new Product();

        product.setName(dto.getName());
        product.setBrand(dto.getBrand());
        product.setQuantity(dto.getQuantity());
        product.setCategory(dto.getCategory());
        product.setPrice(dto.getPrice());
        product.setCreationDate(dto.getCreationDate());
        product.setImageName(dto.getImageName());
        product.setDescription(dto.getDescription());

        return product;
    }
}