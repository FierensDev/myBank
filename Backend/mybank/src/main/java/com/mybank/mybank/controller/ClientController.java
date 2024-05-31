package com.mybank.mybank.controller;

import org.springframework.web.bind.annotation.RestController;

import com.mybank.mybank.entity.Client;
import com.mybank.mybank.service.ClientService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
@RequestMapping("/client")
public class ClientController {

  private ClientService clientService;

  public ClientController(ClientService clientService){
    this.clientService = clientService;
  }
  
  @ResponseStatus(value = HttpStatus.CREATED)
  @PostMapping("/create")
  public ResponseEntity<String> createClient(@RequestBody Client client){
    if(!client.getEmail().contains("@") || client.getEmail().length() < 5){
      return ResponseEntity.badRequest().body("Veuillez indiquer une adresse e-mail valide");
    }

    if(client.getPassword().length() < 8){
      return ResponseEntity.badRequest().body("Veuillez saisir un mot de passe avec plus de 8 caractéres");
    }

    this.clientService.createClient(client);
    return ResponseEntity.ok("Compte ajouté avec succès");
  }

  @GetMapping("/find/{email}/{password}")
  public Client findClientByEmailAndPassword(@PathVariable String email, @PathVariable String password) {
      return this.clientService.findClientByEmailAndPassword(email, password);
  }
  

  @GetMapping("/findAll")
  public List<Client> findClients(){
    return this.clientService.findClients();
  }
  
  @GetMapping("/find/{id}")
  public Client findClientById(@PathVariable int id){
    return this.clientService.findClientById(id);
  }

  @ResponseStatus(value = HttpStatus.ACCEPTED)
  @DeleteMapping("/delete/{id}")
  public void deleteClient(@PathVariable int id){
    this.clientService.deleteClient(id);
  }

  @PutMapping("/modify/{id}")
  public void modifyClient(@PathVariable int id, @RequestBody Client client) {
    this.clientService.modifyClient(id, client);
  }
  
}
