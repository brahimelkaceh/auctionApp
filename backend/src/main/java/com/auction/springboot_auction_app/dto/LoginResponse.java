package com.auction.springboot_auction_app.dto;

import lombok.Getter;

@Getter
public class LoginResponse {
    private final String accessToken;
    private final String refreshToken;
    private final String username;
    private final String type;
    private final Integer id;

    public LoginResponse(String accessToken, String refreshToken, String username, String type , Integer id) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.username = username;
        this.type = type;
        this.id = id;
    }
}
