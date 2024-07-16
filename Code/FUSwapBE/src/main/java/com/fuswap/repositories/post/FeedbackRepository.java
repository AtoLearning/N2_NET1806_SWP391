package com.fuswap.repositories.post;

import com.fuswap.dtos.post.FeedbackDto;
import com.fuswap.entities.post.Feedback;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    @Transactional(readOnly = true)
    @Query("SELECT new com.fuswap.dtos.post.FeedbackDto" +
            "(gp.feedback.FeedbackID, c.Avatar, gp.Title, gp.IsExchange, f.Content, f.CreateAt) " +
            "FROM GoodsPost gp JOIN gp.feedback f " +
            "JOIN f.customer c " +
            "WHERE gp.customer.CUserName = ?1")
    List<FeedbackDto> getFeedbackBySupplier(String supplierUserName);

    @Transactional(readOnly = true)
    @Query("SELECT new com.fuswap.dtos.post.FeedbackDto" +
            "(gp.feedback.FeedbackID, c.Avatar, gp.Title, gp.IsExchange, f.Content, f.CreateAt) " +
            "FROM GoodsPost gp JOIN gp.feedback f " +
            "JOIN f.customer c " +
            "WHERE gp.customer.CUserName = ?1")
    Page<FeedbackDto> getFeedbackBySupplier(Pageable pageable, String supplierUserName);
}
