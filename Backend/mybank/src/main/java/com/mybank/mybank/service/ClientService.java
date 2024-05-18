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
}
