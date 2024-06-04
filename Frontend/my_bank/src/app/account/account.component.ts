import { Component, OnInit } from '@angular/core';
import { MyBankIconComponent } from '../my-bank-icon/my-bank-icon.component';
import { AccountCardComponent } from '../account-card/account-card.component';
import { UserExpensesComponent } from '../user-expenses/user-expenses.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { environnement } from '../../environnement';
import { CookieHandlerService } from '../services/cookie-handler.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [MyBankIconComponent, AccountCardComponent, UserExpensesComponent, RouterOutlet, RouterLink],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {

  constructor(private cookieHandlerService: CookieHandlerService){}
  clientInfo: any;
  
  ngOnInit(): void {
    this.clientInfo = JSON.parse(this.cookieHandlerService.getCookie('MYBANK_CLIENT'))
    
    fetch(environnement.server_url + '/account/find/client/' + this.clientInfo.id, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(f => {
      this.userAccounts = f
    })
    .catch(err => console.log(`deunsLog : `, err))
  }

  userAccounts: any[] = []
  userExpenses: any[] = []
}
