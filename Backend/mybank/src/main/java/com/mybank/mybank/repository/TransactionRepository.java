package com.mybank.mybank.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mybank.mybank.entity.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
  List<Transaction> findByIbanSender(String iban);
  List<Transaction> findByIbanReceiver(String iban);
  // List<Transaction> findByIbanReceiverAndIbanSender(String iban, String iban);
  @Query("SELECT t FROM Transaction t WHERE t.ibanReceiver = :iban OR t.ibanSender = :iban")
  List<Transaction> findByIbanReceiverAndIbanSender(@Param("iban") String iban);
}
