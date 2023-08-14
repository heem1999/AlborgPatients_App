import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PastOrderDetailPage } from './past-order-detail.page';

describe('PastOrderDetailPage', () => {
  let component: PastOrderDetailPage;
  let fixture: ComponentFixture<PastOrderDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastOrderDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PastOrderDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
