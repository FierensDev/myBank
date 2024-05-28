import { Component, Input, OnInit } from '@angular/core';
import { environnement } from '../../environnement';

@Component({
  selector: 'app-user-expenses',
  standalone: true,
  imports: [],
  templateUrl: './user-expenses.component.html',
  styleUrl: './user-expenses.component.css'
})
export class UserExpensesComponent implements OnInit {
  @Input() data: any;
  constructor(){}

  transactionsByIban: any;
  ngOnInit() {
    console.log(this.data.iban); 

    fetch(environnement.server_url + '/transaction/find/iban/'+ this.data.iban,{
      method: 'GET'
    })
    .then(res=> res.json())
    .then(data => {
      console.log(`deunsLog : `, data)
      this.transactionsByIban = data}
    )
    .catch(err => console.log(`deunsLog : `, err))
  }

}