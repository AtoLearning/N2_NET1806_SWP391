package com.fuswap.services.post;

import com.fuswap.dtos.post.FeedbackDto;
import com.fuswap.entities.post.Feedback;
import com.fuswap.repositories.post.FeedbackRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    public Page<FeedbackDto> getFeedbackBySupplier(int pageNo, String supplierUserName) {
        Pageable pageable = PageRequest.of(pageNo - 1, 8);
        Page<FeedbackDto> feedbackDtoPage = feedbackRepository.getFeedbackBySupplier(pageable, supplierUserName);
        return feedbackDtoPage;
    }
}
