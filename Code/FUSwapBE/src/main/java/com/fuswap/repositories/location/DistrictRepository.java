package com.fuswap.repositories.location;

import com.fuswap.entities.location.District;
import com.fuswap.entities.location.Ward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface DistrictRepository extends JpaRepository<District, Integer> {
    @Transactional(readOnly = true)
    @Query("SELECT d FROM District d WHERE d.city.CityID = ?1")
    List<District> findDistrictsByCityID(int cityID);

    @Transactional(readOnly = true)
    @Query("SELECT d.wardSet FROM District d WHERE d.DistrictID = ?1")
    List<Ward> findWardsByDistrictID(int districtID);
}
