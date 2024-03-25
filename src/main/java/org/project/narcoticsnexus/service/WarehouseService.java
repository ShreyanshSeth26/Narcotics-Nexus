package org.project.narcoticsnexus.service;

import lombok.RequiredArgsConstructor;
import org.project.narcoticsnexus.entity.Warehouse;
import org.project.narcoticsnexus.repo.WarehouseRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WarehouseService {
    private final WarehouseRepository warehouseRepository;
    public void addWarehouse(Warehouse warehouse){
        warehouseRepository.save(warehouse);
    }
    public Warehouse getWarehouseById(long id){
        return warehouseRepository.findById(id).orElse(new Warehouse());
    }
    public List<Warehouse> getAllWarehouse(){
        return new ArrayList<>(warehouseRepository.findAll());
    }
    public List<Warehouse> getWarehouseByCity(String city){
        return new ArrayList<>(warehouseRepository.findAllByCity(city));
    }
    public void updateWarehouse(Warehouse warehouse){
        warehouseRepository.save(warehouse);
    }
    public void removeWarehouse(long id){
        warehouseRepository.deleteById(id);
    }

}
