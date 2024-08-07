package com.fuswap.repositories.transaction;

import com.fuswap.entities.transaction.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    @Transactional(readOnly = true)
    @Query("SELECT tr FROM Transaction tr WHERE tr.consumer.CUserName = :cUserName " +
            "OR tr.supplier.CUserName = :cUserName " +
            "ORDER BY tr.CreateAt DESC" )
    Page<Transaction> getMyTransactions(Pageable pageable, String cUserName);

    @Transactional(readOnly = true)
    @Query("SELECT tr FROM Transaction tr WHERE tr.consumer.CUserName = ?1 " +
            "ORDER BY tr.CreateAt DESC" )
    Page<Transaction> getMyConsumerTransactions(Pageable pageable, String cUserName);

    @Transactional(readOnly = true)
    @Query("SELECT tr FROM Transaction tr WHERE tr.supplier.CUserName = ?1 " +
            "ORDER BY tr.CreateAt DESC" )
    Page<Transaction> getMySupplierTransactions(Pageable pageable, String cUserName);
}
