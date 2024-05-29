import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardGifComponent } from './card-gif.component';

describe('CardGifComponent', () => {
  let component: CardGifComponent;
  let fixture: ComponentFixture<CardGifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardGifComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardGifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
