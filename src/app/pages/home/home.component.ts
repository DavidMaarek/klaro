import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { HomeService } from "../../services/home/home.service";
import { HomeCard } from "../../interfaces/home-cards.interface";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public primaryCards: HomeCard[] = [];
  public secondaryCards: HomeCard[] = [];

  constructor(
    private homeService: HomeService,
  ) { }

  ngOnInit(): void {
    this.homeService.getCards().subscribe({
      next: (response: HomeCard[]): void => {
        this.primaryCards = response.filter((card: HomeCard) => card.type == "primary");
        this.secondaryCards = response.filter((card: HomeCard) => card.type == "secondary");
      }
    })
  }
}
