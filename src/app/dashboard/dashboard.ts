import { Component } from '@angular/core';
import {Navbar} from '../navbar/navbar';
import {AuthService} from '../auth/auth.service';
import {CommonModule, NgIf} from '@angular/common';
import {ImportExport} from '../import-export/import-export';
import {ElevatorList} from '../elevator-list/elevator-list';
import {Map} from '../map/map';
import {Filter} from '../filter/filter';
import {Footer} from '../footer/footer';
import {ElevatorDataService} from '../elevator-list/elevator-data.service';
import {Elevator} from '../elevator-list/elevator.model';

@Component({
  selector: 'app-dashboard',
  imports: [
    Navbar,
    CommonModule,
    ImportExport,
    ElevatorList,
    Map,
    Footer
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  elevators: Elevator[] = [];
  filteredElevators: Elevator[] = [];
  searchTerm = '';
  filterVisible = false;
  isAdmin = false;

  constructor(private elevatorService: ElevatorDataService, private authService: AuthService) {
    this.authService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });

    this.elevatorService.getElevators$().subscribe(elevators => {
      this.elevators = elevators;
      this.applyFilterWithTerm(this.searchTerm);
    });
  }

  applyFilter(event: Event) {
    const input = event.target as HTMLInputElement;
    this.applyFilterWithTerm(input.value);
  }

  applyFilterWithTerm(searchTerm: string) {
    this.searchTerm = searchTerm.toLowerCase();
    this.filteredElevators = this.elevators.filter(elevator =>
      Object.values(elevator).some(value =>
        String(value).toLowerCase().includes(this.searchTerm)
      )
    );
  }

  toggleFilter() {
    this.filterVisible = !this.filterVisible;
  }
}
