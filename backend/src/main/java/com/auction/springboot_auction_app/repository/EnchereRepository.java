package com.auction.springboot_auction_app.repository;


import com.auction.springboot_auction_app.model.Enchere;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnchereRepository extends JpaRepository<Enchere, Long> {
    List<Enchere> findByProduitIdOrderByDateAsc(Long produitId);
    List<Enchere> findByClientId(Long clientId);

}
