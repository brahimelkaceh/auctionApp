package com.auction.springboot_auction_app.controller;

import com.auction.springboot_auction_app.model.Enchere;
import com.auction.springboot_auction_app.service.EnchereService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/encheres")
public class EnchereController {

    private final EnchereService enchereService;

    public EnchereController(EnchereService enchereService) {
        this.enchereService = enchereService;
    }

    @PostMapping
    public ResponseEntity<?> placeBid(@RequestBody Enchere enchere) {
        Enchere result = enchereService.placeBid(enchere);
        if (result == null) {
            return ResponseEntity.badRequest().body("Invalid bid amount. Must be exactly 10% higher than the last bid.");
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("/produit/{id}")
    public ResponseEntity<List<Enchere>> getBidsForProduit(@PathVariable Long id) {
        return ResponseEntity.ok(enchereService.getBidsForProduct(id));
    }

    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<Enchere>> getBidsByClient(@PathVariable Long clientId) {
        List<Enchere> encheres = enchereService.getBidsByClientId(clientId);
        return ResponseEntity.ok(encheres);
    }

}

