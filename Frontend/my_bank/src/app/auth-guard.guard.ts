import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { CookieHandlerService } from "./services/cookie-handler.service";

export const AuthGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const cookieHandlerService = inject(CookieHandlerService);
  const router = inject(Router);

  const token = cookieHandlerService.getCookie('MYBANK_CLIENT')
  const currentUrl = state.url;
  const myUrlsNoToken = ['/mybank/sign-in', '/mybank/sign-up', '/mybank/home'];
  const myUrlsToken = ['/mybank/account', '/mybank/bank-transfer', '/mybank/user-settings', '/mybank/create-account'];

  if(token){
    if(myUrlsToken.includes(currentUrl)){
      return true;
    }
    router.navigateByUrl('/mybank/account')
    return false;
  }

  if(!token){
    if(myUrlsNoToken.includes(currentUrl)){
      return true;
    }
    router.navigateByUrl('/mybank/home')
    return false;
  }
  return true;
}