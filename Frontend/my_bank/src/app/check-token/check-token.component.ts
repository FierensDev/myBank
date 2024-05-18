import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-check-token',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './check-token.component.html',
  styleUrl: './check-token.component.css'
})
export class CheckTokenComponent implements OnInit {

  constructor(private router: Router){}

  ngOnInit(): void {
    const token = true;

    if(token){
      this.router.navigate(['/account']);
    }
    else {
      this.router.navigate(['/home']);
    }
    
  }
}