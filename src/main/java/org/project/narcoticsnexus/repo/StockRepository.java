package org.project.narcoticsnexus.repo;

import org.project.narcoticsnexus.entity.Product;
import org.project.narcoticsnexus.entity.Stock;
import org.project.narcoticsnexus.entity.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StockRepository extends JpaRepository<Stock,Long> {
    List<Stock> findAllByProduct(Product product);
    List<Stock> findAllByWarehouse(Warehouse warehouse);
}
