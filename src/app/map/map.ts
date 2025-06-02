import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GoogleMapsModule} from '@angular/google-maps';
import {ElevatorDataService} from '../elevator-list/elevator-data.service';

interface Marker {
  position: google.maps.LatLngLiteral;
  label?: string;
  title?: string;
}

@Component({
  selector: 'app-map',
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './map.html',
  styleUrl: './map.css'
})
export class Map implements OnInit, OnChanges{

  constructor(private elevatorService: ElevatorDataService) {}

  @Input() elevators: any[] = [];
  center: google.maps.LatLngLiteral = { lat: 48.1482, lng: 17.1067 }; // Predvolený stred (napr. Bratislava)
  zoom = 1;
  markers: Marker[] = [];
  highlightedElevatorId: string | null = null;

  ngOnInit() {
    this.elevators = this.elevatorService.getElevators();
    this.updateMarkers();
    this.elevatorService.getHighlightedElevatorId$().subscribe(id => {
      this.highlightedElevatorId = id;
      this.updateMarkers();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['elevators']) {
      this.updateMarkers();
    }
  }

  // private updateMarkers() {
  //   this.markers = this.elevators.map(elevator => ({
  //     position: { lat: elevator.lat, lng: elevator.lon },
  //     label: elevator.name || '',
  //     title: elevator.name,
  //     icon: elevator.name === this.highlightedElevatorId
  //       ? 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
  //       : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
  //   }));
  // }

  private updateMarkers() {
    console.log('Current elevators array:', this.elevators);

    this.markers = this.elevators
      .filter(e => e.lat !== undefined && e.lon !== undefined)
      .map(elevator => {
        console.log('Processing elevator:', elevator);
        return {
          position: { lat: Number(elevator.lat), lng: Number(elevator.lon) },
          label: elevator.name || '',
          title: elevator.name,
          icon: elevator.name === this.highlightedElevatorId
            ? 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        };
      });

    console.log('Markers after update:', this.markers);
  }

  mapOptions: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 18,
    minZoom: 8,
  };
}
