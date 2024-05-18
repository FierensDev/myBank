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

  public void createAccount(Account account) {
    accountRepository.save(account);
  }

  public List<Account> findAccountsByClientId(int clientId) {
    return accountRepository.findByClientId(clientId);
  }
  
  public List<Account> findAllAccounts(){
    return this.accountRepository.findAll();
  }
}
