package com.mybank.mybank.controller;

import org.springframework.web.bind.annotation.RestController;

import com.mybank.mybank.entity.Client;
import com.mybank.mybank.service.ClientService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;


@RestController
@RequestMapping("/client")
public class ClientController {

  private ClientService clientService;

  public ClientController(ClientService clientService){
    this.clientService = clientService;
  }
  
  @ResponseStatus(value = HttpStatus.CREATED)
  @PostMapping("/create")
  public void createClient(@RequestBody Client client){
    this.clientService.createClient(client);
  }

  @GetMapping("/findAll")
  public List<Client> findClients(){
    return this.clientService.findClients();
  }
  
  @GetMapping("/find/{id}")
  public Client findClientById(@PathVariable int id){
    return this.clientService.findClientById(id);
  }

  
}
