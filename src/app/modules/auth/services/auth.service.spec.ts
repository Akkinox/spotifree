import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { AuthService } from './auth.service';
import * as mockRaw from '../../../data/user.json';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';


describe('AuthService', () => {
  let service: AuthService;
  let mockUser: any = (mockRaw as any).default;
  let httpClientSpy: { post: jasmine.Spy }
  let cookies: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: HttpClient, useValue: httpClientSpy },
        CookieService
      ]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post'])
    service = new AuthService(httpClientSpy as any, cookies as any);
    cookies = TestBed.inject(CookieService); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //TODO: Prueba del sendCredentials
  it('Debe de retornar un objeto con "data" y "tokensesion"', (done:DoneFn) => {
    //TODO: Arrange
    const user:any = mockUser.userOk;
    const mockResponse = {
      data:{},
      tokenSession: 'zx12zcxzc3'
    }
    httpClientSpy.post.and.returnValue(of(mockResponse));

    //TODO: Act
    service.sendCredentials(user.email, user.password)
    .subscribe(responseApi => {
      const getProperties = Object.keys(responseApi);
      expect(getProperties).toContain('data');
      expect(getProperties).toContain('tokenSession');
      done()
      console.log("Que responde mi api: ",responseApi);
    });

  });
});
