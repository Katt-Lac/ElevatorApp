import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElevatorDataService } from '../elevator-list/elevator-data.service';
import { Elevator } from '../elevator-list/elevator.model';

@Component({
  selector: 'app-import-export',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './import-export.html',
  styleUrl: './import-export.css'
})
export class ImportExport {
  constructor(private elevatorService: ElevatorDataService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const content = reader.result as string;
        this.processCSV(content);
      };

      reader.readAsText(file);
    }
  }

  processCSV(csvData: string): void {
    const rows = csvData.split('\n').map(row => row.trim()).filter(r => r);
    const [header, ...dataRows] = rows;

    const elevators: Elevator[] = dataRows.map(row => {
      const [name, location, engineer, load, doorClosed] = row.split(',');

      return {
        name: name.trim(),
        location: location.trim(),
        engineer: engineer.trim(),
        load: Number(load.trim()),
        doorClosed: doorClosed.trim().toLowerCase() === 'true',
        showMap: false
      };
    });

    this.elevatorService.setElevators(elevators);
    alert(`CSV imported: ${elevators.length} rows`);
  }

  exportData(): void {
    const elevators: Elevator[] = this.elevatorService.getElevators();

    const header = ['Name', 'Location', 'Engineer', 'Load', 'Door'];
    const rows = elevators.map(e => [
      e.name,
      e.location,
      e.engineer,
      `${e.load}%`,
      e.doorClosed ? 'Closed' : 'Opened'
    ]);

    const csvContent = [header, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'elevator-report.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
}
