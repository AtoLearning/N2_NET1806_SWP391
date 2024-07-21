package com.fuswap.dtos.post;

import com.fuswap.dtos.user.CustomerDto;
import com.fuswap.dtos.user.CustomerViewDto;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
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
    LocalDate createAt;
    String postImage;
    String postStatus;
    CustomerViewDto customerViewDto;
    FeedbackDto feedbackDto;
    String streetNumber;
    String street;
    String wardName;
    String districtName;
    String cityName;
    String cateName;
    String mUserName;
    String managerFullName;
    String reason;

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
                ", postStatus='" + postStatus + '\'' +
                ", customerViewDto=" + customerViewDto +
                ", feedbackDto=" + feedbackDto +
                ", streetNumber='" + streetNumber + '\'' +
                ", street='" + street + '\'' +
                ", wardName='" + wardName + '\'' +
                ", districtName='" + districtName + '\'' +
                ", cityName='" + cityName + '\'' +
                ", cateName='" + cateName + '\'' +
                ", mUserName='" + mUserName + '\'' +
                ", managerFullName='" + managerFullName + '\'' +
                ", reason='" + reason + '\'' +
                '}';
    }
}
