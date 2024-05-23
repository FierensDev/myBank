import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";

export const AuthGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const token = false;
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