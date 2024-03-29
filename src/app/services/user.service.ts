import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CacheService } from './cache.service';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private myClient: HttpClient,
    private cacheService: CacheService
  ) {}

  private BaseURL = 'https://reqres.in/api/users';

  getAllUsers(page: number): Observable<any> {
    const cacheKey = `${this.BaseURL}?page=${page}`;

    return this.intercept(cacheKey);
  }

  getUserByID(id: number): Observable<any> {
    const cacheKey = `${this.BaseURL}/${id}`;
    return this.intercept(cacheKey);
  }

  intercept(cacheKey: string) {
    const cachedResponse = this.cacheService.getCache(cacheKey);

    if (cachedResponse) {
      return of(cachedResponse);
    }

    return this.myClient.get(cacheKey).pipe(
      tap((response) => {
        if (response instanceof HttpResponse) {
          this.cacheService.setCache(cacheKey, response);
        }
      })
    );
  }
}
