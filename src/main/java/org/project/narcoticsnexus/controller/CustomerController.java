package org.project.narcoticsnexus.controller;

import lombok.RequiredArgsConstructor;
import org.project.narcoticsnexus.entity.Cart;
import org.project.narcoticsnexus.entity.Customer;
import org.project.narcoticsnexus.entity.OrderDetails;
import org.project.narcoticsnexus.service.CartService;
import org.project.narcoticsnexus.service.CustomerService;
import org.project.narcoticsnexus.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService;
    private final CartService cartService;
    private final OrderService orderService;
    @RequestMapping(method = RequestMethod.PUT, value = "/user/customer/{username}")
    public void updateCustomerDetails(@RequestBody Customer customer, @PathVariable String username){
        if(customerService.getCustomerByUsername(username)!=null){
            customerService.updateCustomer(customer);
        }
    }

    //Mappings to cart sctions
    @RequestMapping(method = RequestMethod.POST, value = "/user/customer/{username}/cart/product/{productId}/quantity{quantity}")
    public void addProductToCart(@PathVariable String username, @PathVariable String productId, @PathVariable String quantity){
        cartService.addCartItem(username, productId, quantity);
    }
    @RequestMapping(method = RequestMethod.GET, value = "/user/customer/{username}/cart")
    public ResponseEntity<List<Cart>> getAllCartItems(@PathVariable String username){
        return ResponseEntity.ok(cartService.getAllCartItemsByCustomer(username));
    }
    @RequestMapping(method = RequestMethod.PUT, value = "/user/customer/{username}/cart/product/{productId}")
    public void updateCartItem(@RequestBody Cart cartItem, @PathVariable String username, @PathVariable String productId){
        cartService.updateCartItem(cartItem, username, productId);
    }
    @RequestMapping(method = RequestMethod.DELETE, value = "/user/customer/{username}/cart/item/{itemId}")
    public void deleteCartItem(@PathVariable String username, @PathVariable String itemId){
        cartService.deleteCartItem(Long.parseLong(itemId));
    }

    //Mappings to product buying
    @RequestMapping(method = RequestMethod.POST, value = "/user/customer/{username}/order/product/{productId}/quantity/{quantity}")
    public void addOrder(@PathVariable String username, @PathVariable String productId, @PathVariable String quantity){
        orderService.addOrder(username, Long.parseLong(productId), Integer.parseInt(quantity));
    }
    @RequestMapping(method = RequestMethod.GET, value = "/user/customer/{username}/orders")
    public ResponseEntity<List<OrderDetails>> getAllOrders(@PathVariable String username){
        return ResponseEntity.ok(orderService.getAllOrdersByCustomer(username));
    }

    //Mapping to buy whole cart
    @RequestMapping(method = RequestMethod.POST, value = "/user/customer/{username}/order/cart")
    public void orderCart(@PathVariable String username){
        orderService.addCartOrder(username);
    }

    //Mappings to Subscription
}
