package com.fuswap.dtos.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CategoryReq {
    int cateId;
    String cateName;

    @Override
    public String toString() {
        return "CategoryReq{" +
                "cateId='" + cateId + '\'' +
                ", cateName='" + cateName + '\'' +
                '}';
    }
}
