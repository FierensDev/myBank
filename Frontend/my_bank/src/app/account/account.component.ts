import { Component, OnInit } from '@angular/core';
import { MyBankIconComponent } from '../my-bank-icon/my-bank-icon.component';
import { AccountCardComponent } from '../account-card/account-card.component';
import { UserExpensesComponent } from '../user-expenses/user-expenses.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { environnement } from '../../environnement';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [MyBankIconComponent, AccountCardComponent, UserExpensesComponent, RouterOutlet, RouterLink],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {

  constructor(private cookieService: CookieService){}
  
  ngOnInit(): void {
    let userId = JSON.parse(this.cookieService.get('CLIENT'))
    console.log(`deunsLog : `, environnement.server_url + '/account/find/' + userId.id)
    fetch(environnement.server_url + '/account/find/client/' + userId.id, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(f => {
      // this.userAccounts = f
    })
    .catch(err => console.log(`deunsLog : `, err))
  }

  userAccounts: any[] = []

  userExpenses: any[] = [
    {
      id:1,
      ibanSender: 'FR98709769869',
      ibanReceiver: 'FR123445',
      name: 'Salaire',
      amount: 3500,
      date: 1245
    },
    // {
    //   id:2,
    //   ibanSender: 'FR98709769869',
    //   ibanReceiver: 'FR123445',
    //   name: 'Salaire',
    //   amount: 5500,
    //   date: 1245
    // }
  ]
}
