import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd  } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NavbarComponent } from '../navbar/navbar.component';
import { PopUpComponent } from '../pop-up-component/pop-up-component';
@Component({
  selector: 'app-check-token',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, PopUpComponent],
  providers: [CookieService], 
  templateUrl: './check-token.component.html',
  styleUrl: './check-token.component.css'
})
export class CheckTokenComponent implements OnInit {

  token:any;
  constructor(private router: Router, private cookieService: CookieService){}

  ngOnInit(): void {
    this.token = this.cookieService.get('CLIENT');
  }
}