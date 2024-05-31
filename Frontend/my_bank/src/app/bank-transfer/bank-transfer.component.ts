import { Component, OnInit } from '@angular/core';
import { MyBankIconComponent } from '../my-bank-icon/my-bank-icon.component';
import { NgClass } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { environnement } from '../../environnement';
import { CookieHandlerService } from '../services/cookie-handler.service';

@Component({
  selector: 'app-bank-transfer',
  standalone: true,
  imports: [MyBankIconComponent, NgClass, ReactiveFormsModule, NgClass],
  templateUrl: './bank-transfer.component.html',
  styleUrl: './bank-transfer.component.css'
})
export class BankTransferComponent implements OnInit {

  constructor(private cookieHandlerService: CookieHandlerService){}
  userAccounts: any = null
  
  ngOnInit(): void {
    let userId = JSON.parse(this.cookieHandlerService.getCookie('MYBANK_CLIENT'))
    
    fetch(environnement.server_url + '/account/find/client/' + userId.id, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(data => {
      this.userAccounts = data
    })
    .catch(err => console.log(`deunsLog : `, err))
  }

  cssIsFocused: string = '';
  onFocus(e: string){
    this.cssIsFocused = e;
  }

  onBlur(){
    this.cssIsFocused = '';
  }

  applyForm = new FormGroup({
    amount: new FormControl(0.00),
    ibanSender: new FormControl('Veuillez selectionner un compte'),
    ibanReceiver: new FormControl(''),
    name: new FormControl('')
  })

  setApplyFormIbanSender(accountIban: any){
    this.applyForm.get('ibanSender')?.setValue(accountIban)
  }

  onDivClick(): void {
    console.log('Div clicked!');
  }

  submitApplication(){
    console.log(`deunsLog : test`, this.applyForm.value)
    fetch(environnement.server_url + '/account/newTransaction',{
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        "amount": this.applyForm.value.amount,
        "ibanSender": this.applyForm.value.ibanSender,
        "ibanReceiver": this.applyForm.value.ibanReceiver,
        "name": "name",
        "date": new Date().toISOString()
      })
    })
    .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }

  
}

//GET client/id/acc
//Preremplir un acc
//qd on clic faire une liste déroulante avec les autres comptes