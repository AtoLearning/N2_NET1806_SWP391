package com.fuswap.controllers.transaction;

import com.fuswap.dtos.ResponseDto;
import com.fuswap.dtos.post.GoodsPostViewDto;
import com.fuswap.dtos.transaction.TransactionDto;
import com.fuswap.services.transaction.TransactionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/v1")
public class TransactionController {
    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping("/customer/permission/my-trans")
    public ResponseEntity<ResponseDto> getMyTransactions(
            @RequestParam(name = "pageNo", defaultValue = "1") Integer pageNo,
            Authentication authentication) {
        String cUserName = getUserNameInAuthentication(authentication);
        if(pageNo <= 0) pageNo = 1;
        Page<TransactionDto> transactionDtoPage = transactionService.getMyTransactions(pageNo, cUserName);
        if(transactionDtoPage.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(new ResponseDto("204", "Having no any transactions!", "", 0));
        } else {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto("200", "Transaction list!", transactionDtoPage.get(), transactionDtoPage.getTotalPages()));
        }
    }

    @PostMapping("/customer/permission/trans/create")
    public ResponseEntity<ResponseDto> create

    private String getUserNameInAuthentication(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userDetails.getUsername();
    }
}
