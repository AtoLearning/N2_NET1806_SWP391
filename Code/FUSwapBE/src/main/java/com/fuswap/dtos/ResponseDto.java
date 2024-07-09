package com.fuswap.dtos;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResponseDto {

    String status;
    String message;
    Object obj;
    int totalPages;

    @Override
    public String toString() {
        return "ResponseDto{" +
                "status='" + status + '\'' +
                ", message='" + message + '\'' +
                ", obj=" + obj +
                ", totalPages=" + totalPages +
                '}';
    }
}
