import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-expenses',
  standalone: true,
  imports: [],
  templateUrl: './user-expenses.component.html',
  styleUrl: './user-expenses.component.css'
})
export class UserExpensesComponent {
  @Input() data: any;
}
