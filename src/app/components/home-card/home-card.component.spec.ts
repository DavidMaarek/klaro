import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCardComponent } from '@components/home-card/home-card.component';
import { RouterTestingModule } from "@angular/router/testing";

describe('HomeCardComponent', () => {
  let component: HomeCardComponent;
  let fixture: ComponentFixture<HomeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCardComponent, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
