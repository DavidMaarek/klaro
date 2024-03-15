import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HomeCard } from "../../interfaces/home-cards.interface";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient,
  ) { }

  public getCards(): Observable<HomeCard[]> {
    return this.http.get<HomeCard[]>('https://64f98ead4098a7f2fc149a34.mockapi.io/api/homepage-cardshttps://64f98ead4098a7f2fc149a34.mockapi.io/api/homepage-cards')
  }
}
