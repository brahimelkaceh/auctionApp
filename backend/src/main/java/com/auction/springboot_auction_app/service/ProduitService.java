package com.auction.springboot_auction_app.service;

import com.auction.springboot_auction_app.model.Produit;
import com.auction.springboot_auction_app.repository.ProduitRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProduitService {

    private final ProduitRepository produitRepository;

    public ProduitService(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }

    public Produit saveProduit(Produit produit) {
        return produitRepository.save(produit);
    }

    public List<Produit> getAllProduits() {
        return produitRepository.findAll();
    }

    public Produit getProduitById(Long id) {
        return produitRepository.findById(id).orElse(null);
    }

    // ✅ Update method
    public Produit updateProduit(Long id, Produit updatedProduit) {
        return produitRepository.findById(id)
                .map(produit -> {
                    produit.setLibelle(updatedProduit.getLibelle());
                    produit.setPrix(updatedProduit.getPrix());
                    produit.setStatut(updatedProduit.getStatut());
                    produit.setImage(updatedProduit.getImage());
                    return produitRepository.save(produit);
                })
                .orElse(null);
    }

    // ✅ Delete method
    public boolean deleteProduitById(Long id) {
        if (produitRepository.existsById(id)) {
            produitRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
