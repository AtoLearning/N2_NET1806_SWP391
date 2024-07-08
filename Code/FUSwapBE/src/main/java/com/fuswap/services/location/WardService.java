package com.fuswap.services.location;

import com.fuswap.dtos.response.DistrictRes;
import com.fuswap.dtos.response.WardRes;
import com.fuswap.entities.location.District;
import com.fuswap.entities.location.Ward;
import com.fuswap.repositories.location.WardRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class WardService {
    private final WardRepository wardRepository;

    public WardService(WardRepository wardRepository) {
        this.wardRepository = wardRepository;
    }

    public List<WardRes> getWardListByDistrictId(int districtId) {
        List<Ward> wardList = wardRepository.findWardsByDistrictID(districtId);
        List<WardRes> wardResList = new ArrayList<>();
        for (Ward ward : wardList) {
            wardResList.add(new WardRes(
                    ward.getWardID(),
                    ward.getWardName()
            ));
        }
        return wardResList;
    }
}
