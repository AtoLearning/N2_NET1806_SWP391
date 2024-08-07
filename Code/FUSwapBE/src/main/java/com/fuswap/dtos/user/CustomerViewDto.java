package com.fuswap.dtos.user;

import com.fuswap.dtos.post.FeedbackDto;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerViewDto extends CustomerDto {
    List<FeedbackDto> feedbackDtoList;

    public CustomerViewDto(String cUserName, String givenName, String familyName, String nickname, String avatar, Float points, String phone, LocalDate dob, String address, String gender, boolean isVerified, String rank, List<FeedbackDto> feedbackDtoList) {
        super(cUserName, givenName, familyName, nickname, avatar, points, phone, dob, address, gender, isVerified, rank);
        this.feedbackDtoList = feedbackDtoList;
    }

    @Override
    public String toString() {
        return "CustomerViewDto{" +
                "feedbackDtoList=" + (feedbackDtoList != null ? feedbackDtoList.size() : 0) +
                '}';
    }
}
