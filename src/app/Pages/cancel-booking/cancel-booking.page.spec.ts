import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CancelBookingPage } from './cancel-booking.page';

describe('CancelBookingPage', () => {
  let component: CancelBookingPage;
  let fixture: ComponentFixture<CancelBookingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelBookingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CancelBookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
