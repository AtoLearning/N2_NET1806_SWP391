package com.fuswap.services.location;

import com.fuswap.dtos.location.DistrictDto;
import com.fuswap.entities.location.District;
import com.fuswap.repositories.location.DistrictRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class DistrictService {
    private final DistrictRepository districtRepository;

    public DistrictService(DistrictRepository districtRepository) {
        this.districtRepository = districtRepository;
    }

    public List<DistrictDto> getDistrictListByCityId(int cityId) {
        List<District> districtList = districtRepository.findDistrictsByCityID(cityId);
        List<DistrictDto> districtDtoList = new ArrayList<>();
        for (District district : districtList) {
            districtDtoList.add(new DistrictDto(
                    district.getDistrictID(),
                    district.getDistrictName()
            ));
        }
        return districtDtoList;
    }
}
