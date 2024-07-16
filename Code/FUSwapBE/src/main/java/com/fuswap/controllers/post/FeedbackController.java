package com.fuswap.controllers.post;

import com.fuswap.dtos.ResponseDto;
import com.fuswap.dtos.post.FeedbackDto;
import com.fuswap.services.post.FeedbackService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
}
