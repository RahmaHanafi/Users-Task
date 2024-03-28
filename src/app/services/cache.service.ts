import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache: Map<string, HttpResponse<any>> = new Map();

  getCache(key: string): HttpResponse<any> | null {
    return this.cache.get(key) || null;
  }

  setCache(key: string, response: HttpResponse<any>): void {
    this.cache.set(key, response);
  }

  clearCache(): void {
    this.cache.clear();
  }
}
