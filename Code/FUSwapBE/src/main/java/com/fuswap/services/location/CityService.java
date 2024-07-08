package com.fuswap.services.location;

import com.fuswap.dtos.response.CityRes;
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

    public List<CityRes> getCityList() {
        List<City> cityList = cityRepository.findAll();
        List<CityRes> cityResList = new ArrayList<>();
        for (City city : cityList) {
            cityResList.add(new CityRes(
                    city.getCityID(),
                    city.getCityName()
            ));
        }
        return cityResList;
    }
}
