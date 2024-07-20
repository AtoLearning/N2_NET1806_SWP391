package com.fuswap.controllers.post;

import com.fuswap.dtos.ResponseDto;
import com.fuswap.dtos.post.FeedbackDto;
import com.fuswap.dtos.post.FeedbackManageDto;
import com.fuswap.services.post.FeedbackService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@Slf4j
public class FeedbackController {
    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @GetMapping("/customer/supplier/profile/feedback/{cuserName}")
    public ResponseEntity<ResponseDto> getSupplierFeedback(
            @RequestParam(name = "pageNo", defaultValue = "1") int pageNo,
            @PathVariable("cuserName") String cuserName) {
        if(pageNo <= 0) pageNo = 1;
        Page<FeedbackDto> feedbackDtoPage = feedbackService.getFeedbackBySupplier(pageNo, cuserName);
        if(!feedbackDtoPage.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseDto("200", "FEEDBACK OF THE SUPPLIER", feedbackDtoPage.get(), feedbackDtoPage.getTotalPages())
            );
        } else {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(
                    new ResponseDto("204", "THE SUPPLIER HAS NOT HAVE ANY FEEDBACK", "", 0)
            );
        }
    }

    @PostMapping("/customer/permission/feedback/create")
    public ResponseEntity<ResponseDto> createFeedback(
            @RequestBody FeedbackManageDto feedbackManageDto,
            Authentication authentication
    ) {
        String username = getUserNameInAuthentication(authentication);
        boolean isCreate = feedbackService.createFeedback(feedbackManageDto, username);
        if(isCreate) {
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ResponseDto("201", "FEEDBACK CREATED", "", 0)
            );
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseDto("400", "FEEDBACK IS NOT CREATED", "", 0)
            );
        }
    }

    private String getUserNameInAuthentication(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userDetails.getUsername();
    }
}
