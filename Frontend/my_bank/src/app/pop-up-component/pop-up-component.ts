import { Component } from '@angular/core';
import { PopUpService } from '../services/pop-up.service';

@Component({
  selector: 'app-pop-up-component',
  standalone: true,
  imports: [],
  templateUrl: './pop-up-component.html',
  styleUrl: './pop-up-component.css'
})
export class PopUpComponent {
  constructor(public popUpService: PopUpService){}
}
