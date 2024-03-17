import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { HomeService } from "../../services/home/home.service";
import { HomeCard } from "../../interfaces/home-cards.interface";
import { HomeCardComponent } from "../../components/home-card/home-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    HomeCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  @ViewChild('klCarousel') public klCarousel: ElementRef<HTMLUListElement>;
  @ViewChild('klCarouselCard') public klCarouselCard: ElementRef<HTMLElement>;
  public displayLeftArrow: boolean = false
  public displayRightArrow: boolean = false
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
          this.updateCarousel();
        }, 200)
      },
      error: (error) => {
        this.errorApi = true;
      }
    })
  }

  @HostListener('window:resize', [''])
  public updateCarousel(): void {
    const klCarouselNE: HTMLUListElement = this.klCarousel.nativeElement;
    const scrollLeft: number = klCarouselNE.scrollLeft;
    const scrollWidth: number = klCarouselNE.scrollWidth;
    const clientWidth: number = klCarouselNE.clientWidth;
    const windowInnerWidth: number = window.innerWidth;
    const carouselPadding: number = 16;

    this.displayLeftArrow = scrollLeft > carouselPadding;
    this.displayRightArrow = windowInnerWidth < scrollWidth;

    // On masque la fleche de droite si
    if(
      // La taille de la fenêtre est < à la taille des elements du carousel
      windowInnerWidth > scrollWidth ||
      // Le scroll max est atteint
      scrollLeft + clientWidth >= scrollWidth - carouselPadding
    ) {
      this.displayRightArrow = false;
    }
  }

  public scroll(direction: 'left' | 'right'): void {
    const scrollChange: number = direction === 'left' ? -this.klCarouselCard.nativeElement.offsetWidth : this.klCarouselCard.nativeElement.offsetWidth;
    this.klCarousel.nativeElement.scroll({
      left: this.klCarousel.nativeElement.scrollLeft + scrollChange,
      top: 0,
      behavior: 'smooth',
    });
  }
}
