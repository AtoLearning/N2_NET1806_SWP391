package com.fuswap.controllers.transaction;

import com.fuswap.dtos.ResponseDto;
import com.fuswap.dtos.transaction.TransactionViewDto;
import com.fuswap.services.transaction.TransactionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

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
            @RequestParam(name = "transType", defaultValue = "") String transType,
            Authentication authentication) {
        String cUserName = getUserNameInAuthentication(authentication);
        if(pageNo <= 0) pageNo = 1;
        Page<TransactionViewDto> transactionDtoPage = transactionService.getMyTransactions(pageNo, transType, cUserName);
        if(transactionDtoPage.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(new ResponseDto("204", "Having no any transactions!", "", 0));
        } else {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto("200", "Transaction list!", transactionDtoPage.get(), transactionDtoPage.getTotalPages()));
        }
    }

    @GetMapping("/customer/permission/my-con-trans")
    public ResponseEntity<ResponseDto> getMyConsumerTransactions(
            @RequestParam(name = "pageNo", defaultValue = "1") Integer pageNo,
            Authentication authentication) {
        String cUserName = getUserNameInAuthentication(authentication);
        if(pageNo <= 0) pageNo = 1;
        Page<TransactionViewDto> transactionDtoPage = transactionService.getMyConsumerTransactions(pageNo, cUserName);
        if(transactionDtoPage.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(new ResponseDto("204", "Having no any transactions!", "", 0));
        } else {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto("200", "Transaction list!", transactionDtoPage.get(), transactionDtoPage.getTotalPages()));
        }
    }

    @GetMapping("/customer/permission/my-sup-trans")
    public ResponseEntity<ResponseDto> getMySupplierTransactions(
            @RequestParam(name = "pageNo", defaultValue = "1") Integer pageNo,
            Authentication authentication) {
        String cUserName = getUserNameInAuthentication(authentication);
        if(pageNo <= 0) pageNo = 1;
        Page<TransactionViewDto> transactionDtoPage = transactionService.getMySupplierTransactions(pageNo, cUserName);
        if(transactionDtoPage.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(new ResponseDto("204", "Having no any transactions!", "", 0));
        } else {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto("200", "Transaction list!", transactionDtoPage.get(), transactionDtoPage.getTotalPages()));
        }
    }

        @PostMapping("/customer/permission/trans/create/{postId}/{specialPostId}")
        public ResponseEntity<ResponseDto> makeTransaction(
                @PathVariable(name = "postId") Long postId,
                @PathVariable(name = "specialPostId") String specialPostId,
                Authentication authentication
        ) {
            log.info("Check");
            String cUserName = getUserNameInAuthentication(authentication);
            boolean isCreated = transactionService.makeTransaction(postId, specialPostId, cUserName);
            if(isCreated) {
                return ResponseEntity.status(HttpStatus.CREATED).body(
                        new ResponseDto("201", "Transaction is created successful!", "", 0)
                );
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseDto("400", "Transaction is created fail!", "", 0)
            );
        }
    }

    private String getUserNameInAuthentication(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userDetails.getUsername();
    }
}
