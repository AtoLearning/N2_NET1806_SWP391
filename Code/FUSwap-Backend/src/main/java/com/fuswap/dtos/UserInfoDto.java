package com.fuswap.dtos;

public class UserInfoDto {
    private String name;
    private String given_name;
    private String family_name;
    private String email;

    public UserInfoDto() {
    }

    public UserInfoDto(String name, String given_name, String family_name, String email) {
        this.name = name;
        this.given_name = given_name;
        this.family_name = family_name;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGiven_name() {
        return given_name;
    }

    public void setGiven_name(String given_name) {
        this.given_name = given_name;
    }

    public String getFamily_name() {
        return family_name;
    }

    public void setFamily_name(String family_name) {
        this.family_name = family_name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "UserInfoDto{" +
                "name='" + name + '\'' +
                ", given_name='" + given_name + '\'' +
                ", family_name='" + family_name + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
