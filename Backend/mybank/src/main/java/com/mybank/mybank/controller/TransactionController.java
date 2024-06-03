package com.mybank.mybank.controller;

import org.springframework.web.bind.annotation.RestController;

import com.mybank.mybank.ErrorResponse;
import com.mybank.mybank.MessageResponse;
import com.mybank.mybank.entity.Account;
import com.mybank.mybank.entity.Client;
import com.mybank.mybank.entity.Transaction;
import com.mybank.mybank.repository.AccountRepository;
import com.mybank.mybank.service.AccountService;
import com.mybank.mybank.service.ClientService;
import com.mybank.mybank.service.TransactionService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;


@RestController
@RequestMapping("/transaction")
public class TransactionController {

  public TransactionService transactionService;
  public AccountService accountService;

  public TransactionController(TransactionService transactionService, AccountService accountService){
    this.transactionService = transactionService;
    this.accountService = accountService;
  }

  @PostMapping("/create")
  public ResponseEntity<Object> createTransaction(@RequestBody Transaction transaction){
    Account ibanSender = accountService.findAccountByIban(transaction.getIbanSender());
    Account ibanReceiver = accountService.findAccountByIban(transaction.getIbanReceiver());

    if(ibanSender != null && ibanReceiver != null){

      if(ibanSender == ibanReceiver){
        ErrorResponse errorResponse = new ErrorResponse("Veuillez spécifier un IBAN différent de votre compte");
        return ResponseEntity.status(404).body(errorResponse);
      }

      this.transactionService.createTransaction(transaction);
      MessageResponse messageResponse = new MessageResponse("Transaction effectué vers " + transaction.getIbanReceiver());
      return ResponseEntity.status(201).body(messageResponse);
    }

    ErrorResponse errorResponse = new ErrorResponse("Veuillez spécifier un IBAN correct");
    return ResponseEntity.status(404).body(errorResponse);
  }

  @GetMapping("/findAll")
  public List<Transaction> findTransactions(){
    return this.transactionService.findTransactions();
  }
  
  @GetMapping("/find/{id}")
  public Transaction findTransactionById(@PathVariable int id){
    return this.transactionService.findTransactionById(id);
  }

  @GetMapping("/find/ibanSender/{iban}")
  public ResponseEntity<List<Transaction>> findTransactionsByIbanSender(@PathVariable String iban){
    List<Transaction> transactions = transactionService.findTransactionsByIbanSender(iban);
    if(transactions != null && !transactions.isEmpty()){
      return ResponseEntity.ok(transactions);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
  }
  
  @GetMapping("/find/ibanReceiver/{iban}")
  public ResponseEntity<List<Transaction>> findTransactionsByIbanReceiver(@PathVariable String iban){
    List<Transaction> transactions = transactionService.findTransactionsByIbanReceiver(iban);
    if(transactions != null && !transactions.isEmpty()){
      return ResponseEntity.ok(transactions);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
  }

  @GetMapping("/find/iban/{iban}")
  public ResponseEntity<List<Transaction>> findTransactionsByIban(@PathVariable String iban){
    List<Transaction> transactions = transactionService.findTransactionsByIban(iban);
    if(transactions != null && !transactions.isEmpty()){
      return ResponseEntity.ok(transactions);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
  }
}
