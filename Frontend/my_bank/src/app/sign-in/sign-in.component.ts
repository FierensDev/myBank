import { Component } from '@angular/core';
import { MyBankIconComponent } from '../my-bank-icon/my-bank-icon.component';
import { NgClass } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { PopUpService } from '../services/pop-up.service';
import { CookieHandlerService } from '../services/cookie-handler.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [MyBankIconComponent,ReactiveFormsModule, NgClass, RouterOutlet, RouterLink],
  providers: [],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  constructor(private router: Router, private popUpService: PopUpService, private cookieHandlerService: CookieHandlerService){}

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

    if(!this.applyForm.value.email?.includes('@')){
      this.popUpService.showNewMessage('Veuillez indiquer une adresse e-mail valide')
    }

    fetch(`http://localhost:8080/client/find/${this.applyForm.value.email}/${this.applyForm.value.password}`, {
      method: 'GET'
    })
    .then(response => {
      console.log(`deunsLog : `, response)
      if(response.ok){
        return response.json()
      } 
      throw new Error('Server off')
      })
    .then(data => {
      console.log(`deunsLog : `, data)
      this.cookieHandlerService.setCookie('MYBANK_CLIENT', JSON.stringify(data))
      let cookie = this.cookieHandlerService.getCookie('MYBANK_CLIENT')

      this.router.navigateByUrl('/mybank/account');
    })
    .catch(error => {
      this.popUpService.showNewMessage(error.message);
    });
  }

  
}
