import { Component } from '@angular/core';
import { MyBankIconComponent } from '../my-bank-icon/my-bank-icon.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { environnement } from '../../environnement';
import { CookieHandlerService } from '../services/cookie-handler.service';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [MyBankIconComponent, ReactiveFormsModule, NgClass],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {

  constructor(private cookieHandlerService: CookieHandlerService){}

  cssIsFocused: string = '';
  onFocus(e: string){
    this.cssIsFocused = e;
  }

  onBlur(){
    this.cssIsFocused = '';
  }

  cookieUser = JSON.parse(this.cookieHandlerService.getCookie('MYBANK_CLIENT'))

  applyForm = new FormGroup({
    name: new FormControl(''),
    iban: new FormControl(''),
    amount: new FormControl(0),
    type: new FormControl(''),
    date_creation: new FormControl('now'),
    client_id: new FormControl(1)
  })


  submitApplication(){
    console.log(`deunsLog : test`, String(Date.now()))

    let dateNow =  String(Date.now())

    fetch(environnement.server_url + '/account/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "iban": this.applyForm.value.iban,
        "amount":this.applyForm.value.amount,
        "type": this.applyForm.value.type,
        "name" : this.applyForm.value.name,
        "dateCreation" : dateNow,
        "client": {
            "id": this.cookieUser.id
        }
    })
    })
    .then(data => {console.log(`deunsLog : `, data)})
    .catch(err => console.log(`deunsLog : `, err))
  }
}
