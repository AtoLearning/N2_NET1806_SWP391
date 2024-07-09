package com.fuswap.controllers.location;

import com.fuswap.dtos.location.CityDto;
import com.fuswap.dtos.location.DistrictDto;
import com.fuswap.dtos.ResponseDto;
import com.fuswap.dtos.location.WardDto;
import com.fuswap.services.location.CityService;
import com.fuswap.services.location.DistrictService;
import com.fuswap.services.location.WardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1")
public class PostAddressController {
    private final CityService cityService;
    private final DistrictService districtService;
    private final WardService wardService;

    public PostAddressController(CityService cityService, DistrictService districtService, WardService wardService) {
        this.cityService = cityService;
        this.districtService = districtService;
        this.wardService = wardService;
    }

    @GetMapping("/guest/cities")
    public ResponseEntity<ResponseDto> getCityList() {
        List<CityDto> cityDtoList = cityService.getCityList();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseDto("200 OK", "GET CITY LIST SUCCESSFUL", cityDtoList, 0)
        );
    }

    @GetMapping("/guest/districts")
    public ResponseEntity<ResponseDto> getDistrictListByCityId(@RequestParam(name = "cityId") int cityId) {
        List<DistrictDto> districtDtoList = districtService.getDistrictListByCityId(cityId);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseDto("200 OK", "GET DISTRICT LIST SUCCESSFUL", districtDtoList, 0)
        );
    }

    @GetMapping("/guest/wards")
    public ResponseEntity<ResponseDto> getWardListByDistrictId(@RequestParam(name = "districtId") int districtId) {
        List<WardDto> wardDtoList = wardService.getWardListByDistrictId(districtId);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseDto("200 OK", "GET WARD LIST SUCCESSFUL", wardDtoList, 0)
        );
    }
}
