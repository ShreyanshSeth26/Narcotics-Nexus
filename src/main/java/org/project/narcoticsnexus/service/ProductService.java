package org.project.narcoticsnexus.service;

import lombok.RequiredArgsConstructor;
import org.project.narcoticsnexus.entity.Product;
import org.project.narcoticsnexus.entity.Vendor;
import org.project.narcoticsnexus.repo.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    public void addProduct(Product product){
        productRepository.save(product);
    }
    public Product getProductById(long productId){
        return productRepository.findById(productId).orElse(new Product());
    }
    public List<Product> getAllProducts(){
        return new ArrayList<>(productRepository.findAll());
    }
    public List<Product> getProductsByName(String productName){
        return new ArrayList<>(productRepository.findAllByProductName(productName));
    }
    public List<Product> getProductsByVendor(Vendor vendor){
        return new ArrayList<>(productRepository.findAllByVendor(vendor));
    }
    public List<Product> getProductsByCategory(String category){
        return new ArrayList<>(productRepository.findAllByCategory(category));
    }
    public void updateProduct(Product product){
        productRepository.save(product);
    }
    public void removeProduct(Long productId){
        productRepository.deleteById(productId);
    }
}
