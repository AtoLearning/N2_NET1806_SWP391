package com.fuswap.dtos.post;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FeedbackDto {
    Long feedbackId;
    String consumerAvatar; //Avatar of feedback-er
    String feedbackTitle; //Title of goods post that contains this feedback
    Boolean isExchange; ////Type of goods post that contains this feedback
    String content;
    LocalDate createAt;
}
