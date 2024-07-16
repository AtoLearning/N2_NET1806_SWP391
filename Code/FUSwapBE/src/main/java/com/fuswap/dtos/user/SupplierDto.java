package com.fuswap.dtos.user;

import com.fuswap.dtos.post.FeedbackDto;
import com.fuswap.dtos.post.GoodsPostViewDto;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SupplierDto {
    CustomerViewDto customerViewDto;
    Page<GoodsPostViewDto> goodsPostViewDtoPage;
}
