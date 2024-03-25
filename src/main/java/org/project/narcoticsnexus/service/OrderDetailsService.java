package org.project.narcoticsnexus.service;

import lombok.RequiredArgsConstructor;
import org.project.narcoticsnexus.entity.Customer;
import org.project.narcoticsnexus.entity.OrderDetails;
import org.project.narcoticsnexus.repo.OrderDetailsRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderDetailsService {
    private final OrderDetailsRepository orderRepository;
    public void addOrder(OrderDetails order){
        orderRepository.save(order);
    }
    public List<OrderDetails> getAllOrdersByCustomer(Customer customer){
        return new ArrayList<>(orderRepository.findAllByCustomer(customer));
    }
    public void deleteOrder(long orderId){
        orderRepository.deleteById(orderId);
    }
}
