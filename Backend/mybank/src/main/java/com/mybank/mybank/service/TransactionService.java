package com.mybank.mybank.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.mybank.mybank.entity.Transaction;
import com.mybank.mybank.repository.TransactionRepository;

@Service
public class TransactionService {
  private TransactionRepository transactionRepository;

  public TransactionService(TransactionRepository transactionRepository){
    this.transactionRepository = transactionRepository;
  }

  
  public void createTransaction(Transaction transaction){
    this.transactionRepository.save(transaction);
  }

  public List<Transaction> findTransactions(){
    return this.transactionRepository.findAll();
  }

  public Transaction findTransactionById(int id){
    Optional<Transaction> optionalTransaction = this.transactionRepository.findById(id);
    if(optionalTransaction.isPresent()){
      return optionalTransaction.get();
    }
    return null;
  }

  public List<Transaction> findTransactionsByIbanSender(String iban){
   return transactionRepository.findByIbanSender(iban);
  }

  public List<Transaction> findTransactionsByIbanReceiver(String iban){
    return transactionRepository.findByIbanReceiver(iban);
  }

  public List<Transaction> findTransactionsByIban(String iban){
    return transactionRepository.findByIbanReceiverAndIbanSender(iban);
  }
}
