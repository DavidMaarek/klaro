import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { HomeService } from "../../services/home/home.service";
import { HomeCard } from "../../interfaces/home-cards.interface";
import { HomeCardComponent } from "../../components/home-card/home-card.component";
import { CarouselComponent } from "../../components/carousel/carousel.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    HomeCardComponent,
    CarouselComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  @ViewChild(CarouselComponent) carouselComponent!: CarouselComponent;
  public primaryCards: HomeCard[] = [];
  public secondaryCards: HomeCard[] = [];
  public errorApi: boolean = false;

  constructor(
    private homeService: HomeService,
  ) { }

  ngOnInit(): void {
    this.homeService.getCards().subscribe({
      next: (response: HomeCard[]): void => {
        this.primaryCards = response.filter((card: HomeCard) => card.type == "primary");
        this.secondaryCards = response.filter((card: HomeCard) => card.type == "secondary");

        setTimeout(() => {
          this.carouselComponent.updateCarousel();
        }, 200)
      },
      error: (error) => {
        this.errorApi = true;
      }
    })
  }
}
