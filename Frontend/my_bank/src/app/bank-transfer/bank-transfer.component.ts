import { Component } from '@angular/core';
import { MyBankIconComponent } from '../my-bank-icon/my-bank-icon.component';
import { NgClass } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-bank-transfer',
  standalone: true,
  imports: [MyBankIconComponent, NgClass, ReactiveFormsModule],
  templateUrl: './bank-transfer.component.html',
  styleUrl: './bank-transfer.component.css'
})
export class BankTransferComponent {
  cssIsFocused: string = '';
  onFocus(e: string){
    this.cssIsFocused = e;
  }

  onBlur(){
    this.cssIsFocused = '';
  }

  applyForm = new FormGroup({
    amount: new FormControl(0.00),
  })

  submitApplication(){
    console.log(`deunsLog : test`, this.applyForm.value)
  }
}
