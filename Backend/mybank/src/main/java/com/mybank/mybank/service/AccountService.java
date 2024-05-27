package com.mybank.mybank.service;

import java.util.List;
import java.util.Optional;

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
    return accountRepository.findAllByClientId(clientId);
  }

  public Account findAccountById(int id) {
    Optional<Account> optionalAccount = this.accountRepository.findById(id);
    if(optionalAccount.isPresent()){
      return optionalAccount.get();
    } 
    return null;
  }
  
  public List<Account> findAllAccounts(){
    return this.accountRepository.findAll();
  }
  
  public void deleteAccount(int id){
    this.accountRepository.deleteById(id);
  }

  public void modifyAccount(int id, Account account){
    Account accountInBdd = this.findAccountById(id);
    accountInBdd.setIban(account.getIban());
    accountInBdd.setAmount(account.getAmount());
    accountInBdd.setType(account.getType());
    accountInBdd.setName(account.getName());
    accountInBdd.setDateCreation(account.getDateCreation());
    this.accountRepository.save(accountInBdd);
  }
}
