package com.fuswap.repositories;

import com.fuswap.entities.GoodsPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GoodsPostRepository extends JpaRepository<GoodsPost, Long> {

}
