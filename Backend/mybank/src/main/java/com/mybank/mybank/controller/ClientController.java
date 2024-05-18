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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;


@RestController
@RequestMapping("/client")
public class ClientController {

  private ClientService clientService;

  public ClientController(ClientService clientService){
    this.clientService = clientService;
  }

  
  @ResponseStatus(value = HttpStatus.CREATED)
  @PostMapping("/creer")
  public void creer(@RequestBody Client client){
    this.clientService.creer(client);
  }

    @GetMapping("/rechercher")
  public List<Client> rechercher(){
    return this.clientService.rechercher();
  }
  
  @GetMapping("/{id}")
  public Client lire(@PathVariable int id){
    return this.clientService.lire(id);
  }
}
