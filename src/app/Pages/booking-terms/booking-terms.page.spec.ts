import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookingTermsPage } from './booking-terms.page';

describe('BookingTermsPage', () => {
  let component: BookingTermsPage;
  let fixture: ComponentFixture<BookingTermsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingTermsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookingTermsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
