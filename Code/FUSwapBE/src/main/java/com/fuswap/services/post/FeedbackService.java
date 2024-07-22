package com.fuswap.services.post;

import com.fuswap.dtos.post.FeedbackDto;
import com.fuswap.dtos.post.FeedbackManageDto;
import com.fuswap.entities.post.Feedback;
import com.fuswap.entities.post.GoodsPost;
import com.fuswap.repositories.post.FeedbackRepository;
import com.fuswap.repositories.post.GoodsPostRepository;
import com.fuswap.repositories.user.CustomerRepository;
import com.fuswap.services.user.CustomerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@Slf4j
public class FeedbackService {
    private final FeedbackRepository feedbackRepository;
    private final CustomerRepository customerRepository;
    private final GoodsPostRepository goodsPostRepository;

    public FeedbackService(FeedbackRepository feedbackRepository, CustomerRepository customerRepository, GoodsPostRepository goodsPostRepository) {
        this.feedbackRepository = feedbackRepository;
        this.customerRepository = customerRepository;
        this.goodsPostRepository = goodsPostRepository;
    }

    public List<FeedbackDto> getFeedbackBySupplier(String supplierUserName) {
        return feedbackRepository.getFeedbackBySupplier(supplierUserName);
    }

    public Page<FeedbackDto> getFeedbackBySupplier(int pageNo, String supplierUserName) {
        Pageable pageable = PageRequest.of(pageNo - 1, 8);
        Page<FeedbackDto> feedbackDtoPage = feedbackRepository.getFeedbackBySupplier(pageable, supplierUserName);
        return feedbackDtoPage;
    }

    public FeedbackDto getFeedbackByFeedbackId(Long feedbackId) {
        return feedbackRepository.findByFeedbackId(feedbackId);
    }

    public boolean createFeedback(FeedbackManageDto feedbackManageDto, String username) {
        GoodsPost goodsPost = goodsPostRepository.findByPostID(feedbackManageDto.getPostId());
        if(goodsPost != null && (goodsPost.getTransaction() != null && goodsPost.getFeedback() == null)) {
            Feedback feedback = new Feedback();
            feedback.setContent(feedbackManageDto.getFeedbackContent());
            feedback.setCreateAt(LocalDate.now());
            feedback.setCustomer(customerRepository.findByCUserName(username));
            feedbackRepository.save(feedback);

            goodsPost.setFeedback(feedback);
            goodsPostRepository.save(goodsPost);
            return true;
        }
        return false;
    }
}
