import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private isAdmin = new BehaviorSubject<boolean>(false);

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      this.isLoggedIn.next(true);
      this.isAdmin.next(true);
      return true;
    } else if (username === 'user' && password === 'user') {
      this.isLoggedIn.next(true);
      this.isAdmin.next(false);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedIn.next(false);
    this.isAdmin.next(false);
  }

  isLoggedIn$ = this.isLoggedIn.asObservable();
  isAdmin$ = this.isAdmin.asObservable();
}
