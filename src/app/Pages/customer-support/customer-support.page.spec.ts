import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomerSupportPage } from './customer-support.page';

describe('CustomerSupportPage', () => {
  let component: CustomerSupportPage;
  let fixture: ComponentFixture<CustomerSupportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSupportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerSupportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
