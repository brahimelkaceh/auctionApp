package com.auction.springboot_auction_app.controller;

import com.auction.springboot_auction_app.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtUtil jwtUtil;

    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshAccessToken(@RequestBody Map<String, String> body) {
        String refreshToken = body.get("refreshToken");

        if (jwtUtil.isTokenValid(refreshToken)) {
            String username = jwtUtil.extractUsername(refreshToken);
            String newAccessToken = jwtUtil.generateAccessToken(username);

            Map<String, String> tokens = new HashMap<>();
            tokens.put("accessToken", newAccessToken);

            return ResponseEntity.ok(tokens);
        } else {
            return ResponseEntity.status(401).body("Invalid refresh token");
        }
    }
}
