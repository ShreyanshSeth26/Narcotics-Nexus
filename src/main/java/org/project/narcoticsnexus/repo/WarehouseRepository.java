package org.project.narcoticsnexus.repo;

import org.project.narcoticsnexus.entity.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WarehouseRepository extends JpaRepository<Warehouse,Long> {
    List<Warehouse> findAllByCity(String city);
}
