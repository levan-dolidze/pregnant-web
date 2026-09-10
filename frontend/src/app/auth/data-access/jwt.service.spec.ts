import { TestBed } from '@angular/core/testing';
import { JwtService } from './jwt.service';
import { CookieService } from 'ngx-cookie';

describe('JwtService (with Jest)', () => {
  let service: JwtService;
  let cookieServiceMock: jest.Mocked<CookieService>;

  beforeEach(() => {
    cookieServiceMock = {
      get: jest.fn(),
      put: jest.fn(),
      remove: jest.fn(),
    } as unknown as jest.Mocked<CookieService>;

    TestBed.configureTestingModule({
      providers: [
        JwtService,
        { provide: CookieService, useValue: cookieServiceMock }
      ]
    });

    service = TestBed.inject(JwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('saveToken', () => {
    it('should save a token via CookieService', () => {
      service.saveToken('AccessToken', 'testToken');
      expect(cookieServiceMock.put).toHaveBeenCalledWith('AccessToken', 'testToken');
    });
  });

  describe('getToken', () => {
    it('should retrieve a token from CookieService', () => {
      cookieServiceMock.get.mockReturnValue('jwtToken123');

      const token = service.getToken('AccessToken');
      expect(token).toBe('jwtToken123');
      expect(cookieServiceMock.get).toHaveBeenCalledWith('AccessToken');
    });

    it('should return undefined when token does not exist', () => {
      cookieServiceMock.get.mockReturnValue(undefined);

      const token = service.getToken('MissingToken');
      expect(token).toBeUndefined();
    });
  });

  describe('destroyToken', () => {
    it('should remove token via CookieService', () => {
      service.destroyToken('AccessToken');
      expect(cookieServiceMock.remove).toHaveBeenCalledWith('AccessToken');
    });
  });

  describe('integration', () => {
    it('should save, get, and destroy token in sequence', () => {
      cookieServiceMock.get.mockReturnValue('integration123');

      service.saveToken('integrationToken', 'integration123');
      expect(cookieServiceMock.put).toHaveBeenCalledWith('integrationToken', 'integration123');

      const token = service.getToken('integrationToken');
      expect(token).toBe('integration123');

      service.destroyToken('integrationToken');
      expect(cookieServiceMock.remove).toHaveBeenCalledWith('integrationToken');
    });
  });
});
