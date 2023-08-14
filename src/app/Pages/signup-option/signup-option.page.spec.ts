import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignupOptionPage } from './signup-option.page';

describe('SignupOptionPage', () => {
  let component: SignupOptionPage;
  let fixture: ComponentFixture<SignupOptionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupOptionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupOptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
