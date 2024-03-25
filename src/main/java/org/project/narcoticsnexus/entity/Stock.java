package org.project.narcoticsnexus.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long stockId;
    @ManyToOne
    private Warehouse warehouse;
    @ManyToOne
    private Product product;
    private int stock;
}
