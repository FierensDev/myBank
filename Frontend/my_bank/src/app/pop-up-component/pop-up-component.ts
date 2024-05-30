import { Component } from '@angular/core';

@Component({
  selector: 'app-pop-up-component',
  standalone: true,
  imports: [],
  templateUrl: './pop-up-component.html',
  styleUrl: './pop-up-component.css'
})
export class PopUpComponent {
  message: String = "Email ou mot de passe éronné";
}
