package com.auction.springboot_auction_app.service;

import com.auction.springboot_auction_app.model.Enchere;
import com.auction.springboot_auction_app.model.Produit;
import com.auction.springboot_auction_app.model.Client;
import com.auction.springboot_auction_app.repository.EnchereRepository;
import com.auction.springboot_auction_app.repository.ProduitRepository;
import com.auction.springboot_auction_app.repository.ClientRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EnchereService {

    private final EnchereRepository enchereRepository;
    private final ProduitRepository produitRepository;
    private final ClientRepository clientRepository;

    public EnchereService(EnchereRepository enchereRepository,
                          ProduitRepository produitRepository,
                          ClientRepository clientRepository) {
        this.enchereRepository = enchereRepository;
        this.produitRepository = produitRepository;
        this.clientRepository = clientRepository;
    }

    public Enchere placeBid(Enchere enchere) {
        Optional<Produit> optionalProduit = produitRepository.findById(enchere.getProduit().getId());
        Optional<Client> optionalClient = clientRepository.findById(enchere.getClient().getId());

        if (optionalProduit.isEmpty() || optionalClient.isEmpty()) {
            return null;
        }

        Produit produit = optionalProduit.get();
        Client client = optionalClient.get();

        List<Enchere> existingBids = enchereRepository.findByProduitIdOrderByDateAsc(produit.getId());

        double currentPrice = existingBids.isEmpty()
                ? produit.getPrix()
                : existingBids.get(existingBids.size() - 1).getPrix();

        double expectedPrice = Math.round(currentPrice * 1.1 * 100.0) / 100.0;

        if (Math.abs(enchere.getPrix() - expectedPrice) > 0.01) {
            return null; // invalid bid
        }

        enchere.setProduit(produit);
        enchere.setClient(client);
        enchere.setDate(LocalDateTime.now());

        return enchereRepository.save(enchere);
    }

    public List<Enchere> getBidsForProduct(Long produitId) {
        return enchereRepository.findByProduitIdOrderByDateAsc(produitId);
    }

    public List<Enchere> getBidsByClientId(Long clientId) {
        return enchereRepository.findByClientId(clientId);
    }

}
