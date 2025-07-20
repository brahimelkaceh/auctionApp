package com.auction.springboot_auction_app.model;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Produit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String libelle;

    private Double prix;

    private String statut; // "active" or "inactive"

    private String image;

    @ManyToOne
    @JoinColumn(name = "proprietaire_id")
    private Client proprietaire;
}
