import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LanguageListPage } from './language-list.page';

describe('LanguageListPage', () => {
  let component: LanguageListPage;
  let fixture: ComponentFixture<LanguageListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
