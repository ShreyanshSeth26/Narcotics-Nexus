package org.project.narcoticsnexus.repo;

import org.project.narcoticsnexus.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {
}
