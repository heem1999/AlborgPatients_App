import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SortModal1Page } from './sort-modal1.page';

describe('SortModal1Page', () => {
  let component: SortModal1Page;
  let fixture: ComponentFixture<SortModal1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortModal1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SortModal1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
