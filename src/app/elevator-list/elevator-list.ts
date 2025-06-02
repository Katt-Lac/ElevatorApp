import {Component, Input} from '@angular/core';
import {Filter} from '../filter/filter';
import {CommonModule} from '@angular/common';
import {Map} from '../map/map';
import {ElevatorDataService} from './elevator-data.service';
import {Elevator} from './elevator.model';
import {GeocodingService} from '../map/geocoding.service';

@Component({
  selector: 'app-elevator-list',
  imports: [
    Filter, CommonModule, Map
  ],
  templateUrl: './elevator-list.html',
  styleUrl: './elevator-list.css'
})
export class ElevatorList {
  selectedElevator: Elevator | null = null;
  filteredElevators: Elevator[] = [];
  @Input() elevators: Elevator[] = [];

  constructor(private elevatorService: ElevatorDataService, private geocodingService: GeocodingService) {}

  ngOnInit() {
    this.elevatorService.setElevators(this.elevators);
    this.filteredElevators = this.elevators;
    this.addCoordinatesToElevators();
  }

  addCoordinatesToElevators() {
    const geocodedElevators = this.elevators.map(elevator =>
      this.geocodingService.getCoordinates(elevator.location).toPromise()
        .then((response: any) => {
          const result = response.features?.[0]?.geometry?.coordinates;
          if (result) {
            elevator.lon = result[0];
            elevator.lat = result[1];
          } else {
            console.warn('Location not found:', elevator.location);
          }
          return elevator;
        })
        .catch(error => {
          console.error('Geocoding error:', elevator.location, error);
          return elevator;
        })
    );

    Promise.all(geocodedElevators).then((updated) => {
      this.elevators = updated;
      this.elevatorService.setElevators(this.elevators);
    });
  }

  onMouseEnter(elevatorName: string) {
    this.elevatorService.highlightElevator(elevatorName);
  }

  onMouseLeave() {
    this.elevatorService.removeHighlight();
  }

  openModal(elevator: Elevator): void {
    this.selectedElevator = elevator;
  }

  closeModal(): void {
    this.selectedElevator = null;
  }
}
