package com.fuswap.dtos;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ResponseDto {
    private String status;
    private String message;
    private Object data;

    public ResponseDto() {
    }

    public ResponseDto(String status, String message, Object data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
