package org.project.narcoticsnexus.model;

import jakarta.persistence.Lob;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ImageHolder {
    private String image;
}
