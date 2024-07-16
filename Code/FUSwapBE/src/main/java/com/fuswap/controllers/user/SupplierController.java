package com.fuswap.controllers.user;

import com.fuswap.dtos.ResponseDto;
import com.fuswap.dtos.user.SupplierDto;
import com.fuswap.services.user.CustomerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@Slf4j
public class SupplierController {
    private final CustomerService customerService;

    public SupplierController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/customer/supplier/profile/{cuserName}")
    public ResponseEntity<ResponseDto> getSupplierProfile(
            @RequestParam(name = "pageNo", defaultValue = "1") int pageNo,
            @PathVariable("cuserName") String cuserName) {
        if(pageNo <= 0) pageNo = 1;
        SupplierDto supplierDto = customerService.getSupplierProfile(pageNo, cuserName);
        if(supplierDto != null) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseDto("200", "PROFILE HERE", supplierDto, 0)
            );
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseDto("404", "PROFILE NOT FOUND", "", 0)
            );
        }
    }
}
