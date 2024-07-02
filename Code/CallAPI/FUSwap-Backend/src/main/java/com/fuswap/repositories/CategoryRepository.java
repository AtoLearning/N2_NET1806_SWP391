package com.fuswap.repositories;

import com.fuswap.entities.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Transactional
    @Modifying
    @Query("UPDATE Category SET CateName = ?1, IsAvailable = ?2 WHERE CateID = ?3")
    void updateCategory(String cateName, boolean isAvailable, long cateId);

    @Transactional
    @Modifying
    @Query("UPDATE Category SET IsAvailable = false WHERE CateID = ?1")
    void updelCategory(long cateId);

    @Query("SELECT c FROM Category c WHERE c.IsAvailable = true")
    Page<Category> findAllWithAvailable(Pageable pageable);
}
