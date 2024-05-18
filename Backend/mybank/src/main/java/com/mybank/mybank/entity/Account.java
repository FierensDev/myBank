package com.mybank.mybank.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ACCOUNT")
public class Account {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int id;

  private String iban;

  private int amount;

  private String type;

  private String name;

  private String dateCreation;

  @ManyToOne
  private Client client;
}
