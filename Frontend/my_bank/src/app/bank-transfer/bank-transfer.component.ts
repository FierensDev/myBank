import { Component, OnInit } from '@angular/core';
import { MyBankIconComponent } from '../my-bank-icon/my-bank-icon.component';
import { NgClass } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { environnement } from '../../environnement';

@Component({
  selector: 'app-bank-transfer',
  standalone: true,
  imports: [MyBankIconComponent, NgClass, ReactiveFormsModule, NgClass],
  templateUrl: './bank-transfer.component.html',
  styleUrl: './bank-transfer.component.css'
})
export class BankTransferComponent implements OnInit {

  constructor(private cookieService: CookieService){}
  userAccounts: any = null
  ngOnInit(): void {
    let userId = JSON.parse(this.cookieService.get('CLIENT'))
    
    fetch(environnement.server_url + '/account/find/client/' + userId.id, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(f => {
      this.userAccounts = f
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

    fetch(environnement.server_url + '/transaction/create',{
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        "amount": this.applyForm.value.amount,
        "ibanSender": this.applyForm.value.ibanSender,
        "ibanReceiver": this.applyForm.value.ibanReceiver,
        "name": "name",
        "date": "1234"
      })
    })
    .then(res => console.log(`deunsLog : `, res))
    .catch(err =>  console.log(`deunsLog : `, err))
  }

  
}

//GET client/id/acc
//Preremplir un acc
//qd on clic faire une liste déroulante avec les autres comptes