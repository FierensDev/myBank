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

  constructor(private router: Router, private cookieService: CookieService){}

  ngOnInit(): void {
    // const token = false;

    // if(token){
    //   this.router.navigate(['/mybank/account']);
    // }
    // else {
    //   this.router.navigate(['/mybank/home']);
    // }
  }


  // changeOfRoutes() {
  //   console.log('Route changed to:');
  //   // Ajoutez ici la logique spécifique que vous souhaitez exécuter
  //   this.cookieService.set('SESSION_MYBANK', 'value');
  //   let session_cookie = this.cookieService.get('SESSION_MYBANK');
  //   console.log(`deunsLog : `, session_cookie);
  //   if(session_cookie.length > 0){
  //     console.log(`true : `, session_cookie );
  //   } else {
  //     console.log(`false : `, session_cookie )
  //   }
  // }
}