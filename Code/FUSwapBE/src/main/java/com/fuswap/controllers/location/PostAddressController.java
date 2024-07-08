package com.fuswap.controllers.location;

import com.fuswap.dtos.response.CityRes;
import com.fuswap.dtos.response.DistrictRes;
import com.fuswap.dtos.response.ResponseDto;
import com.fuswap.dtos.response.WardRes;
import com.fuswap.services.location.CityService;
import com.fuswap.services.location.DistrictService;
import com.fuswap.services.location.PostAddressService;
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

    @GetMapping("/customer/city")
    public ResponseEntity<ResponseDto> getCityList() {
        List<CityRes> cityResList = cityService.getCityList();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseDto("200 OK", "GET CITY LIST SUCCESSFUL", cityResList, 0)
        );
    }

    @GetMapping("/customer/district")
    public ResponseEntity<ResponseDto> getDistrictListByCityId(@RequestParam(name = "cityId") int cityId) {
        List<DistrictRes> districtResList = districtService.getDistrictListByCityId(cityId);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseDto("200 OK", "GET DISTRICT LIST SUCCESSFUL", districtResList, 0)
        );
    }

    @GetMapping("/customer/ward")
    public ResponseEntity<ResponseDto> getWardListByDistrictId(@RequestParam(name = "districtId") int districtId) {
        List<WardRes> wardResList = wardService.getWardListByDistrictId(districtId);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseDto("200 OK", "GET WARD LIST SUCCESSFUL", wardResList, 0)
        );
    }
}
