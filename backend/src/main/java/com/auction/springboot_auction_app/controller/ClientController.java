package com.auction.springboot_auction_app.controller;

import com.auction.springboot_auction_app.dto.LoginRequest;
import com.auction.springboot_auction_app.dto.LoginResponse;
import com.auction.springboot_auction_app.model.Client;
import com.auction.springboot_auction_app.repository.ClientRepository;
import com.auction.springboot_auction_app.security.JwtUtil;
import com.auction.springboot_auction_app.service.ClientService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

    private final ClientService clientService;
    private final ClientRepository clientRepository;
    private final JwtUtil jwtUtil; // ✅ Injected

    public ClientController(ClientService clientService, ClientRepository clientRepository, JwtUtil jwtUtil) {
        this.clientService = clientService;
        this.clientRepository = clientRepository;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping
    public ResponseEntity<Client> createClient(@RequestBody Client client) {
        return ResponseEntity.ok(clientService.saveClient(client));
    }

    @GetMapping
    public ResponseEntity<List<Client>> getAllClients() {
        return ResponseEntity.ok(clientService.getAllClients());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Client> getClientById(@PathVariable Long id) {
        Client client = clientService.getClientById(id);
        return client != null ? ResponseEntity.ok(client) : ResponseEntity.notFound().build();
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Client client) {
        // Check if username already exists
        boolean exists = clientRepository.existsByUsername(client.getUsername());
        if (exists) {
            return ResponseEntity.badRequest().body("Username is already taken");
        }

        // Save client as is (with plain password)
        Client savedClient = clientService.saveClient(client);

        return ResponseEntity.ok(savedClient);
    }



    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<Client> optionalClient = clientRepository.findByUsernameAndPassword(
                request.getUsername(), request.getPassword()
        );

        if (optionalClient.isPresent()) {
            Client client = optionalClient.get();

            String accessToken = jwtUtil.generateAccessToken(client.getUsername());
            String refreshToken = jwtUtil.generateRefreshToken(client.getUsername());

            return ResponseEntity.ok(new LoginResponse(
                    accessToken,
                    refreshToken,
                    client.getUsername(),
                    client.getType(),
                    Math.toIntExact(client.getId())
            ));
        } else {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }
}
