package com.fuswap.controllers.user;

import com.fuswap.dtos.ResponseDto;
import com.fuswap.dtos.user.ReportManageDto;
import com.fuswap.services.user.ReportService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@Slf4j
public class ReportController {
    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping("/customer/permission/report/create")
    public ResponseEntity<ResponseDto> createReport(
            @RequestBody ReportManageDto reportManageDto,
            Authentication authentication
            ){
        String username = getUserNameInAuthentication(authentication);
        boolean isCreate = reportService.createReport(reportManageDto, username);
        if(isCreate){
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ResponseDto("201", "Your report is moderated!", "", 0)
            );
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseDto("400", "Your report is not moderated!", "", 0)
            );
        }
    }

    private String getUserNameInAuthentication(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userDetails.getUsername();
    }
}
