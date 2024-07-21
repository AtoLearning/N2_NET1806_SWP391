package com.fuswap.services.transaction;

import com.fuswap.dtos.transaction.TransactionViewDto;
import com.fuswap.dtos.user.CustomerDto;
import com.fuswap.entities.post.GoodsPost;
import com.fuswap.entities.transaction.Transaction;
import com.fuswap.entities.user.Customer;
import com.fuswap.repositories.transaction.TransactionRepository;
import com.fuswap.repositories.user.CustomerRepository;
import com.fuswap.services.post.GoodsPostService;
import com.fuswap.services.user.CustomerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cglib.core.Local;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Service
@Slf4j
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final CustomerService customerService;
    private final GoodsPostService goodsPostService;

    public TransactionService(TransactionRepository transactionRepository, CustomerService customerService, GoodsPostService goodsPostService) {
        this.transactionRepository = transactionRepository;
        this.customerService = customerService;
        this.goodsPostService = goodsPostService;
    }

    public Page<TransactionViewDto> getMyTransactions(Integer pageNo, String transType, String cUserName) {
        Pageable pageable = PageRequest.of(pageNo - 1, 3);
        Page<Transaction> transactionPage;
        switch(transType) {
            case "Consumption": {
                transactionPage = transactionRepository.getMyConsumerTransactions(pageable, cUserName);
                break;
            }
            case "Supply": {
                transactionPage = transactionRepository.getMySupplierTransactions(pageable, cUserName);
                break;
            }
            default: {
                transactionPage = transactionRepository.getMyTransactions(pageable, cUserName);
            }
        }
        return getTransactionDto(transactionPage, cUserName);
    }

    private Page<TransactionViewDto> getTransactionDto(Page<Transaction> transactionPage, String cUserName) {
        return transactionPage.map(transaction -> new TransactionViewDto(
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
                        transaction.getConsumer().getAddress(),
                        transaction.getConsumer().getIsVerified(),
                        transaction.getConsumer().getCusRank()
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
                        transaction.getSupplier().getAddress(),
                        transaction.getSupplier().getIsVerified(),
                        transaction.getSupplier().getCusRank()
                ),
                goodsPostService.getPostDetailsByTransId(transaction.getTransID()),
                cUserName.equals(transaction.getConsumer().getCUserName()) ? "Consumption" : "Supply"
        ));
    }

    public boolean makeTransaction(Long postId, String specialPostId, String cUserName) {
        Customer customer = customerService.getByCUserName(cUserName);
        if(customer != null) {
            GoodsPost goodsPost = goodsPostService.getGoodsPostByPostIDAndSpecialPostID(postId, specialPostId);
            if(goodsPost != null && !goodsPost.getCustomer().getCUserName().equals(cUserName)) {
                Transaction transaction = new Transaction();
                transaction.setCreateAt(LocalDate.now());
                transaction.setConsumer(customer);
                transaction.setSupplier(goodsPost.getCustomer());
                Transaction newTransaction = transactionRepository.save(transaction);

                goodsPost.setIsAvailable(false);
                goodsPost.setPostStatus("Transacted");
                goodsPost.setTransaction(newTransaction);
                goodsPostService.save(goodsPost);

                if(goodsPost.getIsExchange()) {
                    customer.setPoints(customer.getPoints() + 0.5f);
                    if(customer.getPoints() >= 30) {
                        customer.setIsVerified(true);
                        customer.setCusRank("Diamond");
                    } else if(15 <= customer.getPoints() && customer.getPoints() <= 29) {
                        customer.setCusRank("Gold");
                    }
                } else {
                    customer.setPoints(customer.getPoints() + 0.5f);
                    if(customer.getPoints() >= 30) {
                        customer.setIsVerified(true);
                        customer.setCusRank("Diamond");
                    } else if(15 <= customer.getPoints() && customer.getPoints() <= 29) {
                        customer.setCusRank("Gold");
                    }

                    goodsPost.getCustomer().setPoints(goodsPost.getCustomer().getPoints() + 0.5f);
                    if(goodsPost.getCustomer().getPoints() >= 30) {
                        goodsPost.getCustomer().setIsVerified(true);
                        goodsPost.getCustomer().setCusRank("Diamond");
                    } else if(15 <= goodsPost.getCustomer().getPoints() && goodsPost.getCustomer().getPoints() <= 29) {
                        goodsPost.getCustomer().setCusRank("Gold");
                    }
                    customerService.save(goodsPost.getCustomer());
                }
                customerService.save(customer);
                return true;
            }
        }
        return false;
    }

    public Page<TransactionViewDto> getMyConsumerTransactions(Integer pageNo, String cUserName) {
        Pageable pageable = PageRequest.of(pageNo - 1, 6);
        Page<Transaction> transactionPage = transactionRepository.getMyConsumerTransactions(pageable, cUserName);
        return getTransactionDto(transactionPage, cUserName);
    }

    public Page<TransactionViewDto> getMySupplierTransactions(Integer pageNo, String cUserName) {
        Pageable pageable = PageRequest.of(pageNo - 1, 6);
        Page<Transaction> transactionPage = transactionRepository.getMySupplierTransactions(pageable, cUserName);
        return getTransactionDto(transactionPage, cUserName);
    }
}
