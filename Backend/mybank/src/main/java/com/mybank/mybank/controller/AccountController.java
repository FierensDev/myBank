package com.mybank.mybank.controller;

import org.springframework.web.bind.annotation.RestController;

import com.mybank.mybank.ErrorResponse;
import com.mybank.mybank.MessageResponse;
import com.mybank.mybank.entity.Account;
import com.mybank.mybank.entity.Client;
import com.mybank.mybank.entity.Transaction;
import com.mybank.mybank.repository.AccountRepository;
import com.mybank.mybank.service.AccountService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

@RestController
@RequestMapping("/account")
public class AccountController {
  private AccountService accountService;
  private AccountRepository accountRepository;

  public AccountController(AccountService accountService, AccountRepository accountRepository){
    this.accountService = accountService;
    this.accountRepository = accountRepository;
  }

  @PostMapping("/create")
  public ResponseEntity<Object> createAccount(@RequestBody Account account) {
      if (account.getClient() != null) {
          accountService.createAccount(account);
          MessageResponse messageResponse = new MessageResponse("Compté crée avec succès");
          return ResponseEntity.ok(messageResponse);
      } else {
          ErrorResponse errorResponse = new ErrorResponse("Impossible de trouver le client");
          return ResponseEntity.badRequest().body(errorResponse);
      }
  }

  @GetMapping("/find/client/{id}")
  public ResponseEntity<List<Account>> findAccountsByClientId(@PathVariable int id){
    List<Account> account = accountService.findAccountsByClientId(id);
    if(account != null && !account.isEmpty()){
      return ResponseEntity.ok(account);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
  }

  @GetMapping("/find/{id}")
  public Account findAccountById(@PathVariable int id){
    return this.accountService.findAccountById(id);
  }

  @GetMapping("/findAll")
  public List<Account> findAllAccounts(){
    return this.accountService.findAllAccounts();
  }

  // @GetMapping("/find/byIban/{iban}")
  // public Account findAccountById(@PathVariable String iban){
  //   return this.accountService.findAccountByIban(iban);
  // }

  
  @ResponseStatus(value = HttpStatus.ACCEPTED)
  @DeleteMapping("/delete/{id}")
  public void deleteAccount(@PathVariable int id){
    this.accountService.deleteAccount(id);
  }

  @PutMapping("/modify/{id}")
  public void modifyAccount(@PathVariable int id, @RequestBody Account account) {
    this.accountService.modifyAccount(id, account);
  }

  // @PutMapping("/modify/{ibanSender}/{ibanReceiver}/{amount}")
  // public void modifyAccountByIban(@PathVariable String ibanSender,@PathVariable String ibanReceiver, @PathVariable int amount) {
  //   this.accountService.modifyAccountByIbanSender(ibanSender, ibanReceiver, amount);
  // }
  
  @PutMapping("/newTransaction")
  public ResponseEntity<Object> modifyAccountByIban(@RequestBody Transaction transaction) {
    Account ibanSender = accountRepository.findByIban(transaction.getIbanSender());
    Account ibanReceiver = accountRepository.findByIban(transaction.getIbanReceiver());

    System.out.println(ibanSender);
    System.out.println(ibanReceiver);

    if(ibanSender != null && ibanReceiver != null){

      if(ibanSender == ibanReceiver){
        ErrorResponse errorResponse = new ErrorResponse("Veuillez spécifier un IBAN différent de votre compte");
        return ResponseEntity.status(404).body(errorResponse);
      }
      this.accountService.modifyAccountsAmount(transaction);
      MessageResponse messageResponse = new MessageResponse("Transaction effectué vers " + transaction.getIbanReceiver());
      return ResponseEntity.status(201).body(messageResponse);
    }

    ErrorResponse errorResponse = new ErrorResponse("Aucun compte trouvé avec cet IBAN");
    return ResponseEntity.status(404).body(errorResponse);
  }
}
