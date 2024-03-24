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
    private String productId;
    private String productName;
    private float cost;
    private float weight;
    @Lob
    private byte[] image;
    private float length;
    private float width;
    private float height;
    private String category;
    @ManyToOne
    private Vendor vendor;

}
