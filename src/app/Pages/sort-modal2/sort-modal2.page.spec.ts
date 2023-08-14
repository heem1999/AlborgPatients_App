import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SortModal2Page } from './sort-modal2.page';

describe('SortModal2Page', () => {
  let component: SortModal2Page;
  let fixture: ComponentFixture<SortModal2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortModal2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SortModal2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
