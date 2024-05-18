package com.mybank.mybank.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mybank.mybank.entity.Account;
import com.mybank.mybank.repository.AccountRepository;

@Service
public class AccountService {

  private AccountRepository accountRepository;

  public AccountService(AccountRepository accountRepository){
    this.accountRepository = accountRepository;
  }

  public void ajouter(Account account) {
    accountRepository.save(account);
}

  public List<Account> rechercher(){
    return this.accountRepository.findAll();
  }

  public List<Account> rechercherParIdClient(int clientId) {
    return accountRepository.findByClientId(clientId);
  }
}
