package com.fuswap.services.transaction;

import com.fuswap.dtos.post.GoodsPostViewDto;
import com.fuswap.dtos.transaction.TransactionDto;
import com.fuswap.dtos.user.CustomerDto;
import com.fuswap.entities.post.GoodsPost;
import com.fuswap.entities.transaction.Transaction;
import com.fuswap.repositories.transaction.TransactionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class TransactionService {
    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public Page<TransactionDto> getMyTransactions(Integer pageNo, String cUserName) {
        Pageable pageable = PageRequest.of(pageNo - 1, 6);
        Page<Transaction> transactionPage = transactionRepository.getMyTransactions(pageable, cUserName);
        return getTransactionDto(transactionPage);
    }

    private Page<TransactionDto> getTransactionDto(Page<Transaction> transactionPage) {
        return transactionPage.map(transaction -> new TransactionDto(
                transaction.getTransID(),
                transaction.getCreateAt(),
                new CustomerDto(
                        transaction.getConsumer().getCUserName(),
                        transaction.getConsumer().getGivenName(),
                        transaction.getConsumer().getFamilyName(),
                        transaction.getConsumer().getNickname(),
                        transaction.getConsumer().getAvatar(),
                        transaction.getConsumer().getPoints(),
                        transaction.getConsumer().getPhone(),
                        transaction.getConsumer().getDOB(),
                        transaction.getConsumer().getGender(),
                        "",
                        transaction.getConsumer().getIsVerified()
                ),
                new CustomerDto(
                        transaction.getSupplier().getCUserName(),
                        transaction.getSupplier().getGivenName(),
                        transaction.getSupplier().getFamilyName(),
                        transaction.getSupplier().getNickname(),
                        transaction.getSupplier().getAvatar(),
                        transaction.getSupplier().getPoints(),
                        transaction.getSupplier().getPhone(),
                        transaction.getSupplier().getDOB(),
                        transaction.getSupplier().getGender(),
                        "",
                        transaction.getSupplier().getIsVerified()
                )
        ));
    }
}
