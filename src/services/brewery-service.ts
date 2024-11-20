// src/services/brewery-service.ts
import axios from 'axios';

export interface Brewery {
  id: string;
  name: string;
  brewery_type: string;
  street?: string;
  city: string;
  state: string;
  postal_code?: string;
  country: string;
  phone?: string;
  website_url?: string;
  longitude?: string;
  latitude?: string;
}

export class BreweryService {
  private apiUrl = 'https://api.openbrewerydb.org/v1';

  async getBreweries(page: number = 1, perPage: number = 10, byType?: string): Promise<Brewery[]> {
    let url = `${this.apiUrl}/breweries?page=${page}&per_page=${perPage}`;
    if (byType) {
      url += `&by_type=${byType}`;
    }
    const response = await axios.get<Brewery[]>(url);
    return response.data;
  }

  async searchBreweries(query: string, byType?: string): Promise<Brewery[]> {
    let url = `${this.apiUrl}/breweries/search?query=${query}`;
    if (byType) {
      url += `&by_type=${byType}`;
    }
    const response = await axios.get<Brewery[]>(url);
    return response.data;
  }

  async getBreweryById(id: string): Promise<Brewery> {
    const response = await axios.get<Brewery>(`${this.apiUrl}/breweries/${id}`);
    return response.data;
  }
}

export const breweryService = new BreweryService();