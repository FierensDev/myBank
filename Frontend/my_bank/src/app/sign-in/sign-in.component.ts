import { Component } from '@angular/core';
import { MyBankIconComponent } from '../my-bank-icon/my-bank-icon.component';
import { NgClass } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PopUpService } from '../services/pop-up.service';
import { CookieHandlerService } from '../services/cookie-handler.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [MyBankIconComponent,ReactiveFormsModule, NgClass, RouterOutlet, RouterLink],
  providers: [CookieService],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  constructor(private cookieService: CookieService, private router: Router, private popUpService: PopUpService, private cookieHandlerService: CookieHandlerService){}

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
    fetch(`http://localhost:8080/client/find/${this.applyForm.value.email}/${this.applyForm.value.password}`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      this.cookieHandlerService.setCookie('MYBANK_CLIENT', JSON.stringify(data))
      let cookie = this.cookieHandlerService.getCookie('MYBANK_CLIENT')

      this.router.navigateByUrl('/mybank/account');
      // window.location.href = "http://localhost:4200/mybank/account";
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      this.popUpService.showNewMessage('Oops ! il y a un probleme avec le serveur...')
    });
  }

  
}
