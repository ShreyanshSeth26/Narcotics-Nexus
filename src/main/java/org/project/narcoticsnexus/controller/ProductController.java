package org.project.narcoticsnexus.controller;

import lombok.RequiredArgsConstructor;
import org.project.narcoticsnexus.entity.Product;
import org.project.narcoticsnexus.service.ProductImageService;
import org.project.narcoticsnexus.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;
    private final ProductImageService productImageService;
    @RequestMapping(method = RequestMethod.GET, value = "/products")
    public ResponseEntity<List<Product>> getAllProducts(){
        return ResponseEntity.ok(productService.getAllProducts());
    }
    @RequestMapping(method = RequestMethod.GET, value = "/products/name/{name}")
    public ResponseEntity<List<Product>> getProductsByName(@PathVariable String name){
        return ResponseEntity.ok(productService.getProductsByName(name));
    }
    @RequestMapping(method = RequestMethod.GET, value = "/products/category/{category}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable String category){
        return ResponseEntity.ok(productService.getProductsByCategory(category));
    }
    @RequestMapping(method = RequestMethod.GET, value = "/products/id/{productId}")
    public Product getProductById(@PathVariable String productId){
        return productService.getProductById(Long.parseLong(productId));
    }

//    Image handling mappings
    @RequestMapping(method = RequestMethod.POST, value = "/product/id/{productId}/image")
    public ResponseEntity<String> addProductImage(@RequestParam("image")MultipartFile file, @PathVariable String productId){
        String response = productImageService.addProductImage(file, Long.parseLong(productId));
        return ResponseEntity.ok(response);
    }

    @RequestMapping(method = RequestMethod.GET,  value ="/product/id/{productId}/image")
    public ResponseEntity<?> getProductImage(@PathVariable String productId){
        byte[] imageData = productImageService.getImageDataByProduct(Long.parseLong(productId));
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imageData);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/product/id/{productId}/image")
    public ResponseEntity<String> updateProductImage(@RequestParam("image")MultipartFile file, @PathVariable String productId){
        String response = productImageService.updateProductImage(file,Long.parseLong(productId));
        return ResponseEntity.ok(response);
    }

}
