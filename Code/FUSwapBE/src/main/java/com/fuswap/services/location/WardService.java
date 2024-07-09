package com.fuswap.services.location;

import com.fuswap.dtos.location.WardDto;
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

    public List<WardDto> getWardListByDistrictId(int districtId) {
        List<Ward> wardList = wardRepository.findWardsByDistrictID(districtId);
        List<WardDto> wardDtoList = new ArrayList<>();
        for (Ward ward : wardList) {
            wardDtoList.add(new WardDto(
                    ward.getWardID(),
                    ward.getWardName()
            ));
        }
        return wardDtoList;
    }
}
