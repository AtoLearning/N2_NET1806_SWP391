package com.fuswap.dtos.post;

import com.fuswap.dtos.user.CustomerDto;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GoodsPostViewDto {
    Long postId;
    String title;
    String content;
    Boolean isExchange;
    Float unitPrice;
    Date createAt;
    String postImage;
    CustomerDto customerDto;
    String streetNumber;
    String street;
    String wardName;
    String districtName;
    String cityName;
    String cateName;

    @Override
    public String toString() {
        return "GoodsPostRes{" +
                "postId=" + postId +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", isExchange=" + isExchange +
                ", unitPrice=" + unitPrice +
                ", createAt=" + createAt +
                ", postImage='" + postImage + '\'' +
                ", customerDto=" + customerDto +
                ", streetNumber='" + streetNumber + '\'' +
                ", street='" + street + '\'' +
                ", wardName='" + wardName + '\'' +
                ", districtName='" + districtName + '\'' +
                ", cityName='" + cityName + '\'' +
                ", cateName='" + cateName + '\'' +
                '}';
    }
}
