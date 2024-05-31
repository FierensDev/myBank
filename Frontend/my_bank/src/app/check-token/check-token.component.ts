import { Component} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { PopUpComponent } from '../pop-up-component/pop-up-component';
import { CookieHandlerService } from '../services/cookie-handler.service';
@Component({
  selector: 'app-check-token',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, PopUpComponent],
  providers: [], 
  templateUrl: './check-token.component.html',
  styleUrl: './check-token.component.css'
})
export class CheckTokenComponent{

  constructor(private router: Router, public cookieHandlerService: CookieHandlerService){}
}