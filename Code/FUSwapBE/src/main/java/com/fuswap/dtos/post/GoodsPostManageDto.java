package com.fuswap.dtos.post;

import com.fuswap.dtos.location.CityDto;
import com.fuswap.dtos.location.DistrictDto;
import com.fuswap.dtos.location.WardDto;
import com.fuswap.entities.location.City;
import com.fuswap.entities.location.District;
import com.fuswap.entities.location.Ward;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GoodsPostManageDto {
    Long postId;
    String specialPostId;
    String title;
    String postContent;
    Boolean isExchange;
    Float unitPrice;
    Date createAt;
    String postImage;
    String streetNumber;
    String street;
    WardDto wardDto;
    DistrictDto districtDto;
    CityDto cityDto;
    CategoryDto categoryDto;
    String mUserName;

    @Override
    public String toString() {
        return "GoodsPostReq{" +
                "postId='" + postId + '\'' +
                ", specialPostId='" + specialPostId + '\'' +
                ", title='" + title + '\'' +
                ", postContent='" + postContent + '\'' +
                ", isExchange=" + isExchange +
                ", unitPrice=" + unitPrice +
                ", createAt=" + createAt +
                ", postImage='" + postImage + '\'' +
                ", streetNumber='" + streetNumber + '\'' +
                ", street='" + street + '\'' +
                ", wardDto=" + wardDto +
                ", districtDto=" + districtDto +
                ", cityDto=" + cityDto +
                ", categoryDto=" + categoryDto +
                ", mUserName=" + mUserName +
                '}';
    }
}
