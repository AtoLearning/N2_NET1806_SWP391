package com.fuswap.repositories.location;

import com.fuswap.entities.location.District;
import com.fuswap.entities.location.Ward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface WardRepository extends JpaRepository<Ward, Integer> {
    @Transactional(readOnly = true)
    @Query("SELECT w FROM Ward w JOIN w.districtSet d WHERE d.DistrictID = ?1")
    List<Ward> findWardsByDistrictID(int districtID);
}
