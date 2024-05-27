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
    console.log(`deunsLog : `, environnement.server_url + '/account/find/' + userId)
    fetch(environnement.server_url + '/account/find/' + 2, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(f => console.log(`deunsLog : `, f))
    .catch(err => console.log(`deunsLog : `, err))
  }

  userAccounts: any[] = [
      {
      id: 1,
      idUser: 1,
      iban: 'FR87654564785',
      amount: 999875,
      type: 'professionnel',
      name: 'Compte de mon magasin',
      date_creation: 102940987987
    },
    // {
    //   id: 2,
    //   idUser: 1,
    //   iban: 'FR0987654678',
    //   amount: 109589,
    //   type: 'personnel',
    //   name: 'Compte personnel',
    //   date_creation: 102940987987
    // },
    // {
    //   id: 3,
    //   idUser: 1,
    //   iban: 'FR98709769869',
    //   amount: 15000,
    //   type: 'personnel',
    //   name: 'Compte de mon fils',
    //   date_creation: 102940987987
    // }
  ]

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
