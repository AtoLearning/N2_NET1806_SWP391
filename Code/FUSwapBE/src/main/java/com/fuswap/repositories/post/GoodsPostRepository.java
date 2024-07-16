package com.fuswap.repositories.post;

import com.fuswap.entities.post.Feedback;
import com.fuswap.entities.post.GoodsPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface GoodsPostRepository extends JpaRepository<GoodsPost, Long>, PagingAndSortingRepository<GoodsPost, Long> {
    GoodsPost findBySpecialPostID(String specialPostID);

    @Query("SELECT gp FROM GoodsPost gp WHERE gp.PostID = ?1")
    GoodsPost findByPostID(Long postID);

    @Transactional(readOnly = true)
    @Query("SELECT gp FROM GoodsPost gp WHERE gp.IsAvailable = true")
    Page<GoodsPost> findAllAndIsAvailable(Pageable pageable);

    @Transactional(readOnly = true)
    @Query("SELECT gp FROM GoodsPost gp WHERE gp.IsAvailable = true AND (gp.Title LIKE %?1% OR gp.Content like %?1%)")
    Page<GoodsPost> findAllAndIsAvailableAndByKeyword(Pageable pageable, String searchValue);

    @Transactional(readOnly = true)
    @Query("SELECT gp FROM GoodsPost gp WHERE gp.customer.CUserName = ?1")
    Page<GoodsPost> findMyPosts(Pageable pageable, String username);

    @Transactional(readOnly = true)
    @Query("SELECT gp FROM GoodsPost gp WHERE gp.PostID = ?1 AND gp.specialPostID = ?2 AND gp.transaction IS NULL")
    GoodsPost findByPostIDAndSpecialPostID(Long postId, String specialPostId);

    @Query("SELECT gp FROM GoodsPost gp WHERE gp.transaction.TransID = ?1")
    GoodsPost findByTransID(Long transId);

    @Transactional(readOnly = true)
    @Query("SELECT gp FROM GoodsPost gp WHERE gp.PostStatus = ?1")
    Page<GoodsPost> findAllAndStatus(Pageable pageable, String status);

    @Transactional(readOnly = true)
    @Query("SELECT gp FROM GoodsPost gp WHERE gp.manager.MUserName = ?1")
    Page<GoodsPost> getMyPostModerationList(Pageable pageable, String username);

    @Transactional(readOnly = true)
    @Query("SELECT gp FROM GoodsPost gp WHERE gp.customer.CUserName = ?1")
    Page<GoodsPost> findByCUserNameAndIsAvailable(Pageable pageable, String cuserName);
}
