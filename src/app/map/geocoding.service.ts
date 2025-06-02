import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private apiKey = '42f00f5c529a4a84ae2ad8ebf33c1454';
  private baseUrl = 'https://api.geoapify.com/v1/geocode/search';

  constructor(private http: HttpClient) {}

  getCoordinates(address: string) {
    const url = `${this.baseUrl}?text=${encodeURIComponent(address)}&apiKey=${this.apiKey}`;
    return this.http.get<any>(url);
  }
}
