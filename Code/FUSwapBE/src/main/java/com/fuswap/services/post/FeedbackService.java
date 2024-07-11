package com.fuswap.services.post;

import com.fuswap.dtos.post.FeedbackDto;
import com.fuswap.entities.post.Feedback;
import com.fuswap.repositories.post.FeedbackRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class FeedbackService {
    private final FeedbackRepository feedbackRepository;

    public FeedbackService(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    public List<FeedbackDto> getFeedbackBySupplier(String supplierUserName) {
        return feedbackRepository.getFeedbackBySupplier(supplierUserName);
    }
}
