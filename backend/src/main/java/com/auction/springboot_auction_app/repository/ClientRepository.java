package com.auction.springboot_auction_app.repository;


import com.auction.springboot_auction_app.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Long> {
    Optional<Client> findByUsernameAndPassword(String username, String password);
    boolean existsByUsername(String username);


}
