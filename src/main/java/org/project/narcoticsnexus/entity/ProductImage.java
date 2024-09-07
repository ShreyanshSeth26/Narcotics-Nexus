package org.project.narcoticsnexus.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long imageId;
    private String imageName;
    private String fileType;
    @Lob
    @Column(name="image_data",length = 1000000)
    private byte[] imageData;
    @OneToOne
    Product product;
}
