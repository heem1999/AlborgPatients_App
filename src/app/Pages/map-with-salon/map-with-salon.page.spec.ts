import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapWithSalonPage } from './map-with-salon.page';

describe('MapWithSalonPage', () => {
  let component: MapWithSalonPage;
  let fixture: ComponentFixture<MapWithSalonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapWithSalonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapWithSalonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
