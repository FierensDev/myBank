package com.mybank.mybank.controller;

import org.springframework.web.bind.annotation.RestController;

import com.mybank.mybank.entity.Account;
import com.mybank.mybank.service.AccountService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/account")
public class AccountController {
  private AccountService accountService;

  public AccountController(AccountService accountService){
    this.accountService = accountService;
  }

  @PostMapping("/create")
  public ResponseEntity<String> createAccount(@RequestBody Account account) {
      if (account.getClient() != null) {
          accountService.createAccount(account);
          return ResponseEntity.ok("Compte ajouté avec succès");
      } else {
          return ResponseEntity.badRequest().body("ID du client non spécifié");
      }
  }

  @GetMapping("/find/{id}")
  public ResponseEntity<List<Account>> findAccountsByClientId(@PathVariable int id){
    List<Account> account = accountService.findAccountsByClientId(id);
    if(account != null && !account.isEmpty()){
      return ResponseEntity.ok(account);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
  }

  @GetMapping("/findAll")
  public List<Account> findAllAccounts(){
    return this.accountService.findAllAccounts();
  }
}
