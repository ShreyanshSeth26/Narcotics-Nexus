package org.project.narcoticsnexus.repo;

import org.project.narcoticsnexus.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionRepository extends JpaRepository<Subscription,Long> {
}
