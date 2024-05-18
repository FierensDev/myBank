import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-bank-icon',
  standalone: true,
  imports: [],
  templateUrl: './my-bank-icon.component.html',
  styleUrl: './my-bank-icon.component.css'
})
export class MyBankIconComponent {
  @Input() width: string= '43';
}
