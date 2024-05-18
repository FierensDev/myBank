import { NgClass } from '@angular/common';
import { Component,ChangeDetectorRef, DoCheck, OnInit, SimpleChanges, OnChanges, Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnChanges {

  currentUrl: string = '';
  @Input() call: number = 0;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`deunsLog : `, changes)
  }
  

  logUrl(){
    console.log(`deunsLog : `, this.router.url == '/account')
  }

  updateCall(c: number){
    c++;
    console.log(`deunsLog : `, c)
  }
}
