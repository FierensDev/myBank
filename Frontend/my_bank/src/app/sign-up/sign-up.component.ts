import { Component } from '@angular/core';
import { MyBankIconComponent } from '../my-bank-icon/my-bank-icon.component';
import { NgClass } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [MyBankIconComponent,ReactiveFormsModule, NgClass, RouterOutlet, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  cssIsFocused: string = '';
  onFocus(e: string){
    this.cssIsFocused = e;
  }

  onBlur(){
    this.cssIsFocused = '';
  }

  applyForm = new FormGroup({
    last_name : new FormControl(''),
    first_name : new FormControl(''),
    date_birthdate : new FormControl(''),
    email : new FormControl(''),
    password : new FormControl('')
  })


  submitApplication(){
    console.log(`deunsLog : test`, this.applyForm.value)
  }
}
