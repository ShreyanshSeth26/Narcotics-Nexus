package org.project.narcoticsnexus.service;

import lombok.RequiredArgsConstructor;
import org.project.narcoticsnexus.entity.Product;
import org.project.narcoticsnexus.entity.Stock;
import org.project.narcoticsnexus.entity.Warehouse;
import org.project.narcoticsnexus.repo.StockRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StockService {
    private final StockRepository stockRepository;
    public void addStock(Stock stock){
        stockRepository.save(stock);
    }
    public Stock getStockById(long id){
        return stockRepository.findById(id).orElse(new Stock());
    }
    public List<Stock> getStockByProduct(Product product){
        return new ArrayList<>(stockRepository.findAllByProduct(product));
    }
    public List<Stock> getStockByWarehouse(Warehouse warehouse){
        return new ArrayList<>(stockRepository.findAllByWarehouse(warehouse));
    }
    public void updateStock(Stock stock){
        stockRepository.save(stock);
    }
    public void deleteStock(long id){
        stockRepository.deleteById(id);
    }
}
