package org.project.narcoticsnexus.service;


import lombok.RequiredArgsConstructor;
import org.project.narcoticsnexus.entity.Cart;
import org.project.narcoticsnexus.entity.Customer;
import org.project.narcoticsnexus.repo.CartRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CartService {
    private final CartRepository cartRepository;
    public void addCartItem(Cart cart){
        cartRepository.save(cart);
    }
    public List<Cart> getAllCartItems(Customer customer){
        return new ArrayList<Cart>(cartRepository.findAllByCustomer(customer));
    }
    public void deleteCartItem(Long cartId){
        cartRepository.deleteById(cartId);
    }
    public void updateCartItem(Cart cart){
        cartRepository.save(cart);
    }
}
