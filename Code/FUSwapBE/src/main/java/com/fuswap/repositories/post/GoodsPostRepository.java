package com.fuswap.repositories.post;

import com.fuswap.entities.post.GoodsPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@Repository
public interface GoodsPostRepository extends JpaRepository<GoodsPost, Long>, PagingAndSortingRepository<GoodsPost, Long> {
    GoodsPost findBySpecialPostID(String specialPostID);

    @Query("SELECT gp FROM GoodsPost gp WHERE gp.IsAvailable = true")
    Page<GoodsPost> findAllAndIsAvailable(Pageable pageable);
}
