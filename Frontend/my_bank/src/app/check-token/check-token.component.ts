import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd  } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-check-token',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  providers: [CookieService], 
  templateUrl: './check-token.component.html',
  styleUrl: './check-token.component.css'
})
export class CheckTokenComponent implements OnInit {

  token = false;
  constructor(private router: Router, private cookieService: CookieService){}

  ngOnInit(): void {}
}