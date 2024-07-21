package com.fuswap.dtos.transaction;

import com.fuswap.dtos.post.GoodsPostViewDto;
import com.fuswap.dtos.user.CustomerDto;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TransactionViewDto {
    Long transId;
    LocalDate creatAt;
    CustomerDto consumer;
    CustomerDto supplier;
    GoodsPostViewDto goodsPostViewDto;
    String transType;
}
