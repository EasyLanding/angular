import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DOCUMENT } from '@angular/common';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: spy },
        { provide: DOCUMENT, useValue: document },
      ],
    });
    service = TestBed.inject(AuthService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should navigate to auth if user is not authenticated', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    service = new AuthService(routerSpy, document);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth']);
  });

  it('should not navigate to auth if user is authenticated', () => {
    spyOn(localStorage, 'getItem').and.returnValue('currentUser');
    service = new AuthService(routerSpy, document);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to auth if data is not set', () => {
    service.data = null;
    service.checkAuth();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth']);
  });

  it('should not navigate to auth if data is set', () => {
    service.data = {};
    service.checkAuth();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
