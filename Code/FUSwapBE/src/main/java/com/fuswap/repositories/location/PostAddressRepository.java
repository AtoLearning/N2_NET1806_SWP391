package com.fuswap.repositories.location;

import com.fuswap.entities.location.PostAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostAddressRepository extends JpaRepository<PostAddress, Long> {
}
