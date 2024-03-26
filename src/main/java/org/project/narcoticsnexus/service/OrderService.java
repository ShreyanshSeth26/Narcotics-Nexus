package org.project.narcoticsnexus.service;

import lombok.RequiredArgsConstructor;
import org.project.narcoticsnexus.entity.Cart;
import org.project.narcoticsnexus.entity.Customer;
import org.project.narcoticsnexus.entity.OrderDetails;
import org.project.narcoticsnexus.entity.Product;
import org.project.narcoticsnexus.repo.OrderDetailsRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderDetailsRepository orderRepository;
    private final CustomerService customerService;
    private final CartService cartService;
    public void addOrder(String username, Long productId, Integer quantity){
        Customer customer = Customer.builder()
                .username(username)
                .build();
        Product product = Product.builder()
                .productId(productId)
                .build();
        LocalDate currentDate= LocalDate.now();
        OrderDetails order = OrderDetails.builder()
                .customer(customer)
                .product(product)
                .dateOfOrder(currentDate)
                .quantity(quantity)
                .build();
        orderRepository.save(order);
    }
    public List<OrderDetails> getAllOrdersByCustomer(String username){
        Customer customer = customerService.getCustomerByUsername(username);
        return new ArrayList<>(orderRepository.findAllByCustomer(customer));
    }

    public void addCartOrder(String username) {
        List<Cart> cartItems = cartService.getAllCartItemsByCustomer(username);
        for (Cart cartItem: cartItems){
            addOrder(username, cartItem.getProduct().getProductId(), cartItem.getQuantity());
        }
    }
}
