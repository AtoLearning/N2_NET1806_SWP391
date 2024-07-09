package com.fuswap.services.location;

import com.fuswap.dtos.location.CityDto;
import com.fuswap.entities.location.City;
import com.fuswap.repositories.location.CityRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class CityService {
    private final CityRepository cityRepository;

    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    public List<CityDto> getCityList() {
        List<City> cityList = cityRepository.findAll();
        List<CityDto> cityDtoList = new ArrayList<>();
        for (City city : cityList) {
            cityDtoList.add(new CityDto(
                    city.getCityID(),
                    city.getCityName()
            ));
        }
        return cityDtoList;
    }
}
