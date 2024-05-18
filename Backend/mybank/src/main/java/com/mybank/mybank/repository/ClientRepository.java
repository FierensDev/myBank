package com.mybank.mybank.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mybank.mybank.entity.Client;

public interface ClientRepository extends JpaRepository<Client, Integer>{

}
