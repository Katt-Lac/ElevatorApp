import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';

export interface Elevator {
  name: string;
  location: string;
  engineer: string;
  load: number;
  doorClosed: boolean;
  showMap: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ElevatorDataService {
  private elevators: any[] = [];
  private highlightedElevatorId$ = new BehaviorSubject<string | null>(null);
  private elevatorsSubject = new BehaviorSubject<Elevator[]>([]);

  constructor() {
    this.setElevators(
       [{
        name: 'Elevator A1',
        location: 'Bratislava',
        engineer: 'Ján Novák',
        load: 75,
        doorClosed: true,
        showMap: false
      },
      {
        name: 'Elevator B2',
        location: 'Prague',
        engineer: 'Lucia Kováčová',
        load: 30,
        doorClosed: false,
        showMap: false
      },
      {
        name: 'Elevator C3',
        location: 'New York',
        engineer: 'Marek Horváth',
        load: 90,
        doorClosed: true,
        showMap: false
      },
      {
        name: 'Elevator D4',
        location: 'London',
        engineer: 'Petra Šimeková',
        load: 55,
        doorClosed: true,
        showMap: false
      },
      {
        name: 'Elevator E5',
        location: 'Madrid',
        engineer: 'Martin Benko',
        load: 20,
        doorClosed: false,
        showMap: false
      },
      {
        name: 'Elevator F6',
        location: 'Lisbon',
        engineer: 'Eva Malá',
        load: 65,
        doorClosed: true,
        showMap: false
      },
      {
        name: 'Elevator G7',
        location: 'Sidney',
        engineer: 'Tomáš Urban',
        load: 40,
        doorClosed: false,
        showMap: false
      },
      {
        name: 'Elevator H8',
        location: 'Moscow',
        engineer: 'Zuzana Križová',
        load: 85,
        doorClosed: true,
        showMap: false
      },
   ]);
  }


  getElevators(): Elevator[] {
    return this.elevatorsSubject.getValue();
  }

  getElevators$(): Observable<Elevator[]> {
    return this.elevatorsSubject.asObservable();
  }

  setElevators(elevators: Elevator[]): void {
    this.elevatorsSubject.next(elevators);
  }

  highlightElevator(id: string) {
    this.highlightedElevatorId$.next(id);
  }

  removeHighlight() {
    this.highlightedElevatorId$.next(null);
  }

  getHighlightedElevatorId$(): Observable<string | null> {
    return this.highlightedElevatorId$.asObservable();
  }
}
