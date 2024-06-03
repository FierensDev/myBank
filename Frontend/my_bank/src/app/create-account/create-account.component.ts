import { Component } from '@angular/core';
import { MyBankIconComponent } from '../my-bank-icon/my-bank-icon.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { environnement } from '../../environnement';
import { CookieHandlerService } from '../services/cookie-handler.service';
import { PopUpService } from '../services/pop-up.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [MyBankIconComponent, ReactiveFormsModule, NgClass],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {

  constructor(private router: Router,private popUpService: PopUpService,private cookieHandlerService: CookieHandlerService){}

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
    .then(response => {
      if(response.ok){
        return response.json();
      }
      if(response.status == 500){
        this.popUpService.showNewMessage("Impossible de trouver le client")
        throw new Error("Impossible de trouver le client");
      }
      return null;
    })
    .then(data => {
      console.log(`deunsLog : `, data)
      this.popUpService.showNewMessage(data.message)
      this.router.navigateByUrl('/mybank/account');
    })
    .catch((error) => {
      console.error('Erreur:', error);
    });
  }
}
