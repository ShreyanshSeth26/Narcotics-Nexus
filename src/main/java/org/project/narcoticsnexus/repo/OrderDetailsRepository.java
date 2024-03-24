package org.project.narcoticsnexus.repo;

import org.project.narcoticsnexus.entity.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Long> {
}
