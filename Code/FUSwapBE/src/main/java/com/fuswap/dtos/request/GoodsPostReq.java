package com.fuswap.dtos.request;

import com.fuswap.entities.location.City;
import com.fuswap.entities.location.District;
import com.fuswap.entities.location.Ward;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GoodsPostReq {
    String title;
    String content;
    Boolean isExchange;
    Float unitPrice;
    String postImage;
    String streetNumber;
    String street;
    Ward ward;
    District district;
    City city;
    CategoryReq categoryReq;

    @Override
    public String toString() {
        return "GoodsPostReq{" +
                "title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", isExchange=" + isExchange +
                ", unitPrice=" + unitPrice +
                ", postImage='" + postImage + '\'' +
                ", streetNumber='" + streetNumber + '\'' +
                ", street='" + street + '\'' +
                ", ward=" + ward +
                ", district=" + district +
                ", city=" + city +
                ", categoryReq=" + categoryReq +
                '}';
    }
}
