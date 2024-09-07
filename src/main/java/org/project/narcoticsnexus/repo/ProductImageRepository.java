package org.project.narcoticsnexus.repo;

import org.project.narcoticsnexus.entity.Product;
import org.project.narcoticsnexus.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductImageRepository extends JpaRepository<ProductImage,Long> {
    ProductImage findByProduct(Product product);
}
