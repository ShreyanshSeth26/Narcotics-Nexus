package org.project.narcoticsnexus.entity;

import jakarta.persistence.*;
import lombok.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long productId;
    private String productName;
    private float cost;
    private float weight;
    private int stock;
    private float length;
    private float width;
    private float height;
    private String category;
    @ManyToOne
    private Vendor vendor;
}
