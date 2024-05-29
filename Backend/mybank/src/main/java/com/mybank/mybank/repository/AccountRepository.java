package com.mybank.mybank.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mybank.mybank.entity.Account;

public interface AccountRepository extends JpaRepository<Account, Integer> {
  @Query("SELECT acc FROM Account acc WHERE acc.client.id = :clientId")
  List<Account> findAllByClientId(@Param("clientId") int clientId);
  Account findByIban(String iban);
}
