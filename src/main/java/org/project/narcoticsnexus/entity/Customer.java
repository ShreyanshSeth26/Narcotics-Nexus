package org.project.narcoticsnexus.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Customer {
    @Id
    private String username;
    private boolean membership;
    private int nexusPoints;
    private String firstName;
    private String lastName;
    private String aadharNum;
    private Date dob;
    private String phoneNum;
    private String emailId;
    private String upiId;
    @OneToOne
    private Login login;

}
