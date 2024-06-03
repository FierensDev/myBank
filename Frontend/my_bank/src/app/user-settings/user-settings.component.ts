import { Component, OnInit } from '@angular/core';
import { MyBankIconComponent } from '../my-bank-icon/my-bank-icon.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { environnement } from '../../environnement';
import { CookieHandlerService } from '../services/cookie-handler.service';
import { PopUpService } from '../services/pop-up.service';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [MyBankIconComponent,ReactiveFormsModule, NgClass],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css'
})
export class UserSettingsComponent implements OnInit {

  constructor(private cookieHandlerService: CookieHandlerService, private router: Router, private popUpService: PopUpService){}
  client: any;
  clientData:any;
  ngOnInit(): void {
    let userId = JSON.parse(this.cookieHandlerService.getCookie('MYBANK_CLIENT'))
    this.client = userId;
    console.log(`azer : `, this.client)
    fetch(environnement.server_url + '/client/find/' + userId.id, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(userAcc => {
      console.log(userAcc);
      
      this.clientData = userAcc
      this.applyForm.patchValue({
        email: userAcc.email,
        password:  userAcc.password,
        secret_code:  userAcc.secret_code,
        last_name:  userAcc.lastName,
        first_name: userAcc.firstName,
        gender: userAcc.gender,
        date_birthdate: userAcc.dateBirthday,
        address:  userAcc.address,
        city:  userAcc.city,
        zip_code:  userAcc.zipCode,
        country:  userAcc.country,
        phone_number:  userAcc.phoneNumber
      });

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
    email: new FormControl(''),
    password: new FormControl(''),
    secret_code: new FormControl(0),
    last_name: new FormControl(''),
    first_name: new FormControl(''),
    gender: new FormControl(''),
    date_birthdate: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    zip_code: new FormControl(''),
    country: new FormControl(''),
    phone_number: new FormControl(0),
  })

  submitApplication(){
    console.log(`deunsLog : test`, this.applyForm.value)

    fetch(environnement.server_url + '/client/modify/' + this.client.id,{
      // fetch(environnement.server_url + '/client/modify/700',{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": this.applyForm.value.email,
        "password":this.applyForm.value.password,
        "secret_code":this.applyForm.value.secret_code,
        "firstName": this.applyForm.value.first_name,
        "lastName" :this.applyForm.value.last_name,
        "gender" : this.applyForm.value.gender,
        "dateBirthday": this.applyForm.value.date_birthdate,
        "address" :this.applyForm.value.address,
        "city":this.applyForm.value.city,
        "zipCode":this.applyForm.value.zip_code,
        "country":this.applyForm.value.country,
        "phoneNumber":this.applyForm.value.phone_number
    })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      if(response.status == 404){
        return response.json()
        .then(data => {
          this.popUpService.showNewMessage(data.error)
          throw new Error(data)
        })
      }
      this.popUpService.showNewMessage("Erreur réseau")
      return null;
    })
    .then(data => {
        this.popUpService.showNewMessage(data.message);
        this.router.navigateByUrl('/mybank/account');
    })
    .catch((error) => {
        console.error('Erreur:', error);
    });
  }

  disconnectUser(){
    this.cookieHandlerService.deleteCookie('MYBANK_CLIENT')
    this.router.navigateByUrl('/mybank/home')
  }
}
