package com.fuswap.repositories.post;

import com.fuswap.dtos.post.GoodsPostViewDto;
import com.fuswap.entities.post.Feedback;
import com.fuswap.entities.post.GoodsPost;
import io.lettuce.core.dynamic.annotation.Param;
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
    @Query("SELECT gp FROM GoodsPost gp WHERE gp.IsAvailable = true AND gp.PostID != :postId")
    List<GoodsPost> findAllAndIsAvailableExceptRecentPost(Long postId);

    @Transactional(readOnly = true)
    @Query("SELECT gp FROM GoodsPost gp WHERE gp.IsAvailable = true " +
            "AND (gp.Title LIKE %:searchValue% OR gp.Content like %:searchValue%) " +
            "AND (:cityName IS NULL OR gp.postAddress.city.CityName = :cityName) " +
            "AND (:districtName IS NULL OR gp.postAddress.district.DistrictName = :districtName) " +
            "AND (:wardName IS NULL OR gp.postAddress.ward.WardName = :wardName) " +
            "AND (:isExchange IS NULL OR gp.IsExchange = :isExchange) " +
            "AND (:cateName IS NULL OR gp.category.CateName = :cateName)")
    Page<GoodsPost> findAllAndIsAvailableAndByKeyword(
            Pageable pageable,
            @Param("searchValue") String searchValue,
            @Param("cityName") String cityName,
            @Param("districtName") String districtName,
            @Param("wardName") String wardName,
            @Param("isExchange") Boolean isExchange,
            @Param("cateName") String cateName);

    @Transactional(readOnly = true)
    @Query("SELECT gp FROM GoodsPost gp WHERE gp.customer.CUserName = :username AND " +
            "(:postStatus IS NULL OR gp.PostStatus = :postStatus)")
    Page<GoodsPost> findMyPosts(Pageable pageable, String postStatus, String username);

    @Transactional(readOnly = true)
    @Query("SELECT gp FROM GoodsPost gp WHERE gp.PostID = ?1 AND gp.specialPostID = ?2 AND gp.transaction IS NULL")
    GoodsPost findByPostIDAndSpecialPostID(Long postId, String specialPostId);

    @Query("SELECT gp FROM GoodsPost gp WHERE gp.transaction.TransID = ?1")
    GoodsPost findByTransID(Long transId);

    @Transactional(readOnly = true)
    @Query("SELECT gp FROM GoodsPost gp WHERE (:status = '' OR gp.PostStatus = :status) " +
            "AND (gp.customer.CUserName LIKE %:gmail%) " +
            "AND (:mUserName = '' OR gp.manager.MUserName = :mUserName)")
    Page<GoodsPost> findByStatusAndGmail(
            Pageable pageable,
            @Param("status") String status,
            @Param("gmail") String gmail,
            @Param("mUserName") String mUserName);

    @Transactional(readOnly = true)
    @Query("SELECT gp FROM GoodsPost gp WHERE gp.manager.MUserName = ?1")
    Page<GoodsPost> getMyPostModerationList(Pageable pageable, String username);

    @Transactional(readOnly = true)
    @Query("SELECT gp FROM GoodsPost gp WHERE gp.customer.CUserName = ?1")
    Page<GoodsPost> findByCUserNameAndIsAvailable(Pageable pageable, String cuserName);

    @Transactional(readOnly = true)
    @Query("SELECT gp FROM GoodsPost gp WHERE gp.PostID != :postId " +
            "AND gp.IsAvailable = true " +
            "AND (:cateName = '' OR gp.category.CateName = :cateName) " +
            "AND (:cuserName = '' OR gp.customer.CUserName = :cuserName)")
    List<GoodsPost> getRelatedGoods(Long postId, String cateName, String cuserName);
}
