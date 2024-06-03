package com.mybank.mybank.controller;

import org.springframework.web.bind.annotation.RestController;

import com.mybank.mybank.ErrorResponse;
import com.mybank.mybank.MessageResponse;
import com.mybank.mybank.entity.Client;
import com.mybank.mybank.service.ClientService;

import java.util.HashMap;
import java.util.List;

import org.hibernate.mapping.Map;
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
  public ResponseEntity<Object> createClient(@RequestBody Client client){
    if(!client.getEmail().contains("@") || client.getEmail().length() < 5){
      ErrorResponse errorResponse = new ErrorResponse("Veuillez indiquer une adresse e-mail valide");
      return ResponseEntity.status(404).body(errorResponse);
    }

    if(client.getPassword().length() < 8){
      ErrorResponse errorResponse = new ErrorResponse("Veuillez saisir un mot de passe avec plus de 8 caractéres");
      return ResponseEntity.status(404).body(errorResponse);
    }

    this.clientService.createClient(client);
    MessageResponse messageResponse = new MessageResponse("Compte ajouté avec succès");
    return ResponseEntity.ok(messageResponse);
  }

  @GetMapping("/find/{email}/{password}")
  public ResponseEntity<Object> findClientByEmailAndPassword(@PathVariable String email, @PathVariable String password) {
    Client client = this.clientService.findClientByEmailAndPassword(email, password);
     if(client != null){
      return ResponseEntity.ok().body(client);
     }  else {

      ErrorResponse errorResponse = new ErrorResponse("Email ou mot de passe incorrect");
      return ResponseEntity.status(404).body(errorResponse);
     }
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
  public ResponseEntity<Object> modifyClient(@PathVariable int id, @RequestBody Client client) {
    Client clientInBdd = this.findClientById(id);
    if(clientInBdd != null){
      this.clientService.modifyClient(id, client);

      MessageResponse messageResponse = new MessageResponse("Client modifié avec succès");
      return ResponseEntity.status(200).body(messageResponse);
    }
    else {
      ErrorResponse errorResponse = new ErrorResponse("Impossible de trouver le client à modifier");
      return ResponseEntity.status(404).body(errorResponse);
    }
  }
  
}
