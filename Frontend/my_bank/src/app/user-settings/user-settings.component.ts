import { Component } from '@angular/core';
import { MyBankIconComponent } from '../my-bank-icon/my-bank-icon.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [MyBankIconComponent,ReactiveFormsModule, NgClass],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css'
})
export class UserSettingsComponent {
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
}
