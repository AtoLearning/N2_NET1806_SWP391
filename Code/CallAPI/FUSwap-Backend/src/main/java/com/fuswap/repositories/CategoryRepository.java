package com.fuswap.repositories;

import com.fuswap.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Transactional
    @Modifying
    @Query("UPDATE Category SET CateName = ?1, isAvailable = ?2 WHERE CateID = ?3")
    void updateCategory(String cateName, boolean isAvailable, long cateId);

    @Transactional
    @Modifying
    @Query("UPDATE Category SET isDelete = true, isAvailable = false WHERE CateID = ?1")
    void updelCategory(long cateId);
}
