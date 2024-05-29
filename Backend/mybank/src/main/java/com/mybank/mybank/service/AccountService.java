package com.mybank.mybank.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mybank.mybank.entity.Account;
import com.mybank.mybank.entity.Transaction;
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

  // public Account findAccountByIban(String iban) {
  //   Optional<Account> optionalAccount = this.accountRepository.findByIban(iban);
  //   if(optionalAccount.isPresent()){
  //     return optionalAccount.get();
  //   } 
  //   return null;
  // }
  
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

  // public void modifyAccountByIbanSender(String ibanSender, String ibanReceiver, int amount){
  //   Account accountIbanSender = this.accountRepository.findByIban(ibanSender);
  //   Account accountIbanReceiver = this.accountRepository.findByIban(ibanReceiver);
  //   //Gérer les mauvais iban 
  //    if (accountIbanSender == null || accountIbanReceiver == null) {
  //     System.out.println("Un des IBANs fournis est incorrect.");
  //     return;
  //   }

  //   int noOverdraft = accountIbanSender.getAmount() - amount;
  //   if(noOverdraft < 0){
  //     System.out.println("Montant inférieur à 0 pour le compte avec l'IBAN : " + accountIbanSender);
  //   }
  //   else{
  //       System.out.println("Virement effectué");
  //       accountIbanSender.setAmount(accountIbanSender.getAmount() - amount);
  //       this.accountRepository.save(accountIbanSender);

  //       accountIbanReceiver.setAmount(accountIbanReceiver.getAmount() + amount);
  //       this.accountRepository.save(accountIbanReceiver);

  //       //Enregistrer la transaction
  //       // Transaction transaction = new Transaction();
  //       // transaction.setIbanSender(ibanSender);
  //       // transaction.setIbanReceiver(ibanReceiver);
  //       // transaction.setAmount(amount);
  //       // transaction.setDate(new Date()); // or LocalDate.now() for java.time.LocalDate
  //       // this.transactionService.createTransaction(transaction);
  //   }
  // }
  @Autowired
  private TransactionService transactionService;
  public void modifyAccountsAmount(Transaction transaction){
    Account accountIbanSender = this.accountRepository.findByIban(transaction.getIbanSender());
    Account accountIbanReceiver = this.accountRepository.findByIban(transaction.getIbanReceiver());

    if (accountIbanSender == null || accountIbanReceiver == null) {
      System.out.println("Un des IBANs fournis est incorrect.");
      return;
    }

    int noOverdraft = accountIbanSender.getAmount() - transaction.getAmount();
    if(noOverdraft < 0){
      System.out.println("Montant inférieur à 0 pour le compte avec l'IBAN : " + accountIbanSender);
    }
    else{
        System.out.println("Virement effectué");
        accountIbanSender.setAmount(accountIbanSender.getAmount() - transaction.getAmount());
        this.accountRepository.save(accountIbanSender);

        accountIbanReceiver.setAmount(accountIbanReceiver.getAmount() + transaction.getAmount());
        this.accountRepository.save(accountIbanReceiver);

        // Enregistrer la transaction
        this.transactionService.createTransaction(transaction);
    }
  }
}
