package com.fuswap.dtos.user;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReportManageDto {
    Long reportId;
    String title;
    String content;
    String reportImage;
    String reportStatus;
    Long postId;
    String postTitle;
    String postImage;
}
