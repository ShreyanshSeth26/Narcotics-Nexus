package org.project.narcoticsnexus.repo;

import org.project.narcoticsnexus.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
}
