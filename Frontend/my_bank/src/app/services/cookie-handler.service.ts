import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class CookieHandlerService {
  constructor(private cookieService: CookieService) {}
  token: string = "";

  setCookie(name: string, value: string): void {
    this.cookieService.set(name, value);
    this.token = this.cookieService.get(name);
  }

  getCookie(name: string): string {
    this.token = this.cookieService.get(name);
    return this.cookieService.get(name);
  }

  checkCookie(name: string): boolean {
    return this.cookieService.check(name);
  }

  deleteCookie(name: string): void {
    this.cookieService.delete(name);
    this.token = "";
  }
}
