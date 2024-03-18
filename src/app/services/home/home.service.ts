import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HomeCard } from "../../interfaces/home-cards.interface";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient,
  ) { }

  public getCards(): Observable<HomeCard[]> {
    return this.http.get<HomeCard[]>(`${environment.apiDomain}/homepage-cards`);
  }
}
