import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getCurrentUser() {
    return { username: 'admin', role: 'admin' }; // alebo 'user'
  }
}
