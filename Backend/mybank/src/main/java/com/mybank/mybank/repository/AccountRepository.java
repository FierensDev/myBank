package com.mybank.mybank.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mybank.mybank.entity.Account;

public interface AccountRepository extends JpaRepository<Account, Integer> {
  List<Account> findByClientId(int clientId);
}
