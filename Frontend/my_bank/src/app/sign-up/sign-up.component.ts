import { Component } from '@angular/core';
import { MyBankIconComponent } from '../my-bank-icon/my-bank-icon.component';
import { NgClass } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { environnement } from '../../environnement';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [MyBankIconComponent,ReactiveFormsModule, NgClass, RouterOutlet, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  constructor(private router: Router){}
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
    console.log(`deunsLog : test`,  JSON.stringify(this.applyForm.value))
    let dateNow =  String(Date.now())
    fetch(environnement.server_url + '/client/create', {
      method: 'POST', 
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
        "phoneNumber":this.applyForm.value.phone_number,
        "dateCreation" : dateNow,
    })
    })
    .then(response => {
      if(response.status === 201){
        this.router.navigateByUrl('/mybank/sign-in');
      }
    }) 
    .catch((error) => {
      console.error('Erreur:', error);
    });
  }
}
