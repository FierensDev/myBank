import { Component } from '@angular/core';
import { MyBankIconComponent } from '../my-bank-icon/my-bank-icon.component';
import { NgClass } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [MyBankIconComponent,ReactiveFormsModule, NgClass, RouterOutlet, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  cssIsFocused: string = '';
  onFocus(e: string){
    this.cssIsFocused = e;
  }

  onBlur(){
    this.cssIsFocused = '';
  }

  applyForm = new FormGroup({
    email : new FormControl(''),
    password : new FormControl('')
  })

  submitApplication(){
    console.log(`deunsLog : test`, this.applyForm.value)

    fetch('http://localhost:8080/client/create', {
      method: 'POST'
    })
  }
}
