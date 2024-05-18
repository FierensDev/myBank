import { Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { BankTransferComponent } from './bank-transfer/bank-transfer.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { HomeComponent } from './home/home.component';
import { CheckTokenComponent } from './check-token/check-token.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const routes: Routes = [
  { 
    path: '',   
    component: CheckTokenComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  { 
    path: 'home',   
    component: HomeComponent
  },
  {
    path: 'account',
    component: AccountComponent
  },
  {
    path: 'bank-transfer',
    component: BankTransferComponent
  },
  {
    path: 'user-settings',
    component: UserSettingsComponent
  },
  {
    path: 'create-account',
    component: CreateAccountComponent
  },

];
