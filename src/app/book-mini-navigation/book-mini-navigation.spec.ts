import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookMiniNavigation } from './book-mini-navigation';

describe('BookMiniNavigation', () => {
  let component: BookMiniNavigation;
  let fixture: ComponentFixture<BookMiniNavigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookMiniNavigation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookMiniNavigation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
