import { Component } from '@angular/core';
import { MyBankIconComponent } from '../my-bank-icon/my-bank-icon.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [MyBankIconComponent, ReactiveFormsModule, NgClass],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {

  cssIsFocused: string = '';
  onFocus(e: string){
    this.cssIsFocused = e;
  }

  onBlur(){
    this.cssIsFocused = '';
  }

  applyForm = new FormGroup({
    name: new FormControl(''),
    iban: new FormControl(''),
    amount: new FormControl(0),
    type: new FormControl('')
  })


  submitApplication(){
    console.log(`deunsLog : test`, this.applyForm.value)
  }
}
