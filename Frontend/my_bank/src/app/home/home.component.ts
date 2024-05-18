import { Component, OnInit } from '@angular/core';
import { MyBankIconComponent } from '../my-bank-icon/my-bank-icon.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MyBankIconComponent, RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
}
