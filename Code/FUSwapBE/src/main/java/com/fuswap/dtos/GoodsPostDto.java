package com.fuswap.dtos;

import com.fuswap.entities.Category;
import com.fuswap.entities.PostAddress;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GoodsPostDto {
    Long postID;
    String title;
    String content;
    Boolean isExchange;
    Float unitPrice;
    Date createAt;
    CustomerDto customerDto;
    PostAddress postAddress;
    Category category;

    @Override
    public String toString() {
        return "GoodsPostDto{" +
                "postID=" + postID +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", isExchange=" + isExchange +
                ", unitPrice=" + unitPrice +
                ", createAt=" + createAt +
                ", customerDto=" + customerDto +
                ", postAddress=" + postAddress +
                ", category=" + category +
                '}';
    }
}
