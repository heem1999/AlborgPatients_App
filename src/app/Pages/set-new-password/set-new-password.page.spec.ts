import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SetNewPasswordPage } from './set-new-password.page';

describe('SetNewPasswordPage', () => {
  let component: SetNewPasswordPage;
  let fixture: ComponentFixture<SetNewPasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetNewPasswordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SetNewPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
