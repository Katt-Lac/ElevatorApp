import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {ImportExport} from '../import-export/import-export';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    NgOptimizedImage,
    ImportExport,
    NgIf
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  isMenuOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
