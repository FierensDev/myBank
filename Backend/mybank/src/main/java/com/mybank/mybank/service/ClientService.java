package com.mybank.mybank.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.mybank.mybank.entity.Client;
import com.mybank.mybank.repository.ClientRepository;

@Service
public class ClientService {

  private ClientRepository clientRepository;

  public ClientService(ClientRepository clientRepository){
      this.clientRepository = clientRepository;
  }

  public void createClient(Client client ){
    this.clientRepository.save(client);
  }

  public List<Client> findClients(){
    return this.clientRepository.findAll();
  }

  public Client findClientById(int id){
    Optional<Client> optionalClient = this.clientRepository.findById(id);
    if(optionalClient.isPresent()){
      return optionalClient.get();
    }
    return null;
  }

  public void deleteClient(int id){
    this.clientRepository.deleteById(id);
  }

  public void modifyClient(int id, Client client){
    Client clientInBdd = this.findClientById(id);
    clientInBdd.setEmail(client.getEmail());
    clientInBdd.setPassword(client.getPassword());
    clientInBdd.setSecretCode(client.getSecretCode());
    clientInBdd.setLastName(client.getLastName());
    clientInBdd.setFirstName(client.getFirstName());
    clientInBdd.setGender(client.getGender());
    clientInBdd.setDateBirthday(client.getDateBirthday());
    clientInBdd.setDateCreation(client.getDateCreation());
    clientInBdd.setAddress(client.getAddress());
    clientInBdd.setCity(client.getCity());
    clientInBdd.setZipCode(client.getZipCode());
    clientInBdd.setCountry(client.getCountry());
    clientInBdd.setPhoneNumber(client.getPhoneNumber());
    this.clientRepository.save(clientInBdd);
  }
}
