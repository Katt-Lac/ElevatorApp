import { Routes } from '@angular/router';
import {Login} from './login/login';
import {Dashboard} from './dashboard/dashboard';
import {Logout} from './logout/logout';
import {AuthGuard} from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'logout', component: Logout },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard]
  },
];
