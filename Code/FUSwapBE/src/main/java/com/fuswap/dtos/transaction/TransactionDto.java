package com.fuswap.dtos.transaction;

import com.fuswap.dtos.user.CustomerDto;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TransactionDto {
    Long transId;
    Date creatAt;
    CustomerDto consumer;
    CustomerDto supplier;
}
