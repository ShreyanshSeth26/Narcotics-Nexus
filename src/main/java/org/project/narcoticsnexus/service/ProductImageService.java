package org.project.narcoticsnexus.service;


import lombok.RequiredArgsConstructor;
import org.project.narcoticsnexus.entity.Product;
import org.project.narcoticsnexus.entity.ProductImage;
import org.project.narcoticsnexus.repo.ProductImageRepository;
import org.project.narcoticsnexus.utils.ImageUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class ProductImageService {
    private final ProductImageRepository productImageRepository;
    private final ProductService productService;

    public String addProductImage(MultipartFile file, long productId){
        String name = file.getOriginalFilename();
        String type = file.getContentType();
        byte[] image;
        try {
            image = ImageUtils.compressImage(file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        Product product = productService.getProductById(productId);
        ProductImage productImage = productImageRepository.save(ProductImage.builder()
                .imageName(name)
                .fileType(type)
                .imageData(image)
                .product(product)
                .build()
        );

        return STR."Image uploaded Successfully: \{productImage.getImageName()}";
    }
    public void addProductDefaultImage(Product product){
        ProductImage defaultImage = getProductImageByProduct(0);
        ProductImage setImage = productImageRepository.save(ProductImage.builder()
                .imageName(defaultImage.getImageName())
                .fileType(defaultImage.getFileType())
                .imageData(defaultImage.getImageData())
                .product(product)
                .build());
    }
    public ProductImage getProductImageById(long productImageId){
        return productImageRepository.findById(productImageId).orElse(new ProductImage());
    }

    public ProductImage getProductImageByProduct(long productId){
        Product product = productService.getProductById(productId);
        return productImageRepository.findByProduct(product);
    }

    public byte[] getImageDataByProduct(long productId){
        ProductImage productImage = getProductImageByProduct(productId);
        return ImageUtils.decompressImage(productImage.getImageData());
    }

    public String updateProductImage(MultipartFile file, long productId){
        String name = file.getOriginalFilename();
        String type = file.getContentType();
        byte[] image;
        try {
            image = ImageUtils.compressImage(file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        ProductImage productImage = getProductImageByProduct(productId);
        productImage.setImageData(image);
        productImage.setImageName(name);
        productImage.setFileType(type);
        productImageRepository.save(productImage);
        return STR."Image updated successfully: \{productImage.getImageName()}" ;
    }
}
