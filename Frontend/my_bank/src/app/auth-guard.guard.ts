// import { CanActivateFn } from '@angular/router';

// export const authGuardGuard: CanActivateFn = (route, state) => {
//   return true;
// };

import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";

export const AuthGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    const token = true;
    const currentUrl = state.url;
    const myUrlsNoToken = ['/mybank/sign-in', '/mybank/sign-up', '/mybank/home'];
    const myUrlsToken = ['/mybank/account', '/mybank/bank-transfer', '/mybank/user-settings', '/mybank/create-account'];

    console.log(`URL  : `, router.url)
    console.log(`deunsLog : `, currentUrl)
    console.log(`deunsLog : `, document.location.href)

    if(token){
      if(myUrlsToken.includes(currentUrl)){
        return true;
      }
      router.navigateByUrl('/mybank/account')
      return false;
    }

    // if(!token && mesUrlsNoToken.includes(currentUrl)){
    //   return true;
    // }
    // if(token && mesUrlsToken.includes(currentUrl)){
    //   router.navigateByUrl('/mybank/account')
    //   return false;
    // }
    return true;
}