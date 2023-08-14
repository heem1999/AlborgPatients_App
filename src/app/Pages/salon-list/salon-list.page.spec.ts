import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SalonListPage } from './salon-list.page';

describe('SalonListPage', () => {
  let component: SalonListPage;
  let fixture: ComponentFixture<SalonListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalonListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SalonListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
