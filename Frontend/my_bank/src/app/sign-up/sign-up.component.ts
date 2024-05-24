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
    last_name : new FormControl('lastn'),
    first_name : new FormControl('firstn'),
    date_birthdate : new FormControl('datebirth'),
    email : new FormControl('mail@mail.com'),
    password : new FormControl('passwo'),
  })


  submitApplication(){
    console.log(`deunsLog : test`,  JSON.stringify(this.applyForm.value))
    
    fetch('http://localhost:8080/client/create', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.applyForm.value)
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
