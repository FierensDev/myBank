import { Component } from '@angular/core';
import { MyBankIconComponent } from '../my-bank-icon/my-bank-icon.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [MyBankIconComponent,ReactiveFormsModule, NgClass],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css'
})
export class UserSettingsComponent {

  constructor(private cookieService: CookieService, private router: Router){}

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
    last_name: new FormControl(''),
    first_name: new FormControl(''),
    date_birthdate: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    zip_code: new FormControl(''),
    country: new FormControl(''),
    phone_number: new FormControl(0),
  })

  submitApplication(){
    console.log(`deunsLog : test`, this.applyForm.value)
  }

  disconnectUser(){
    console.log(`deunsLog : DISCONNCT`, )
    this.cookieService.delete('CLIENT');
    this.router.navigateByUrl('/mybank/home')
  }
}
