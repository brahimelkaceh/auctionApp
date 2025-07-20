package com.auction.springboot_auction_app.repository;

import com.auction.springboot_auction_app.model.Produit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProduitRepository extends JpaRepository<Produit, Long> {
}