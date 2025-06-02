export interface Elevator {
  name: string;
  location: string;
  engineer: string;
  load: number;
  doorClosed: boolean;
  showMap: boolean;
  lat?: number;
  lon?: number;
}
