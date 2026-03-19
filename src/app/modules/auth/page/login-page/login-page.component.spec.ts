import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { LoginPageComponent } from './login-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      declarations: [ LoginPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //TODO: Este test se valida que los datos entrantes sean erroneos
  //TODO: Se ocupa el patron AAA (Arrange, Act, Assert)
  it('should be true in invalid form', () => {
    //Arrange
    const mockCredentials = {
      email:'xaxaxaxaxa',
      password: '11111111111111111111111111'
    }
    const emailForm:any = component.formLogin.get('email');
    const passwordForm:any = component.formLogin.get('password');

    //Act
    emailForm.setValue(mockCredentials.email);
    passwordForm.setValue(mockCredentials.password);
    
    //Assert
    expect(component.formLogin.invalid).toBeTrue();
  });

  it('should be true in valid form ', () => {
    //Arrange
    const mockCredentials = {
      email:'test@test.com',
      password: '1111111'
    }
    const emailForm:any = component.formLogin.get('email');
    const passwordForm:any = component.formLogin.get('password');

    //Act
    emailForm.setValue(mockCredentials.email);
    passwordForm.setValue(mockCredentials.password);
    
    //Assert
    expect(component.formLogin.invalid).toBeFalse();
  });

  it('Validacion de boton de iniciar sesion', () => {
    const elementRef = fixture.debugElement.query(By.css('.form-action button'));
    const getInnerText = elementRef.nativeElement.innerText;

    expect(getInnerText).toEqual('Iniciar sesión');

  });

});
