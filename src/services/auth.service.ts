import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../environments/environments';
import { LoginRequestDto } from '../models/account/login-request-dto';
import { AuthResponseDto } from '../models/account/auth-response-dto';
import { RegisterRequestDto } from '../models/account/register-request-dto';
import { UserDetailDto } from '../models/account/user-detail-dto';
import { ChangePasswordRequestDto } from '../models/account/change-password-request-dto';
import { ResetPasswordRequestDto } from '../models/account/reset-password-request-dto';
import { TfaSetupDto } from '../models/account/tfa-setup-dto';
import { TfaDto } from '../models/account/tfa-dto';
import { UpdateProfileDto } from '../models/account/update-profile-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  private userKey = 'user';

  isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(data: LoginRequestDto): Observable<AuthResponseDto> {
    return this.http
      .post<AuthResponseDto>(`${this.apiUrl}/api/account/login`, data)
      .pipe(
        map((response) => {
          if (response.isSuccess) {           
            localStorage.setItem(this.userKey, JSON.stringify(response));
          }
          return response;
        })
      );
  }

  register(data: RegisterRequestDto): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/api/account/register`, data);
  }

  updateProfile(data: UpdateProfileDto): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/api/account/update-profile`, data);
  }

  getUserProfileDetail(): Observable<UserDetailDto> { 
    return this.http.get<UserDetailDto>(`${this.apiUrl}/api/account/user-detail`);
  }

  forgotPassword(email: string): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/api/account/forgot-password`, { email });
  }

  resetPassword(data: ResetPasswordRequestDto): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/api/account/reset-password`, data);
  }

  changePassword(data: ChangePasswordRequestDto): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/api/account/change-password`, data);
  }

  getAll(): Observable<UserDetailDto[]> {
    return this.http.get<UserDetailDto[]>(`${this.apiUrl}/api/account`);
  }

  refreshToken(data: {email: string; token: string; refreshToken: string;}): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/api/account/refresh-token`, data);
  }

  public getTfaSetup = (email: string) => {
    return this.http.get<TfaSetupDto> (`${this.apiUrl}/api/account/tfa-setup?email=${email}`);
  }
  
  public postTfaSetup = (data: TfaSetupDto) => {
    return this.http.post<TfaSetupDto> (`${this.apiUrl}/api/account/tfa-setup`, data);
  }
  
  public disableTfa = (email: string) => {
    return this.http.delete<TfaSetupDto> (`${this.apiUrl}/api/account/tfa-setup?email=${email}`);
  }

  public loginTfa = (data: TfaDto) => {
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/api/account/login-tfa`, data)
        .pipe(
          map((response) => {
            if (response.isSuccess) {      
              const user = localStorage.getItem(this.userKey);
              if (user != null && user){
                const userDetail: AuthResponseDto = JSON.parse(user);     
                userDetail.isTfaSuccess = true;
                localStorage.setItem(this.userKey, JSON.stringify(userDetail));
              }              
            }
            return response;
          })
        );
  }

  getUserDetail = () => {
    const token = this.getToken();
    if (!token) return null;
    const decodedToken: any = jwtDecode(token);
    const userDetail = {
      id: decodedToken.nameid,
      fullName: decodedToken.name,
      email: decodedToken.email,
      roles: decodedToken.role || [],
    };

    return userDetail;
  };

  isAuthenticated = (): boolean => {

    let isAuthenticated = false;

    const user = localStorage.getItem(this.userKey);
    if (!user) return isAuthenticated;

    const userDetail: AuthResponseDto = JSON.parse(user);

    if(!userDetail.isTfaEnabled)
    {
      if(userDetail.token)
      {
        isAuthenticated = true;
      }
    }
    else{
      if(userDetail.isTfaSuccess){
        isAuthenticated = true;
      }
    }

    return isAuthenticated;
  };

  updateAuthenticationStatus(value : boolean){
    this.isAuthenticatedSubject.next(value);
  }

  private isTokenExpired() {
    const token = this.getToken();
    if (!token) return true;
    const decoded = jwtDecode(token);
    const isTokenExpired = Date.now() >= decoded['exp']! * 1000;
    // if (isTokenExpired) this.logout();
    return true;
  }

  getRoles = (): string[] | null => {
    const token = this.getToken();
    if (!token) return null;

    const decodedToken: any = jwtDecode(token);
    return decodedToken.role || null;
  };

  logout = (): void => {
    localStorage.removeItem(this.userKey);
    this.updateAuthenticationStatus(false);
  };

  getToken = (): string | null => {
    const user = localStorage.getItem(this.userKey);
    if (!user) return null;
    const userDetail: AuthResponseDto = JSON.parse(user);
    return userDetail.token;
  };

  getRefreshToken = (): string | null => {
    const user = localStorage.getItem(this.userKey);
    if (!user) return null;
    const userDetail: AuthResponseDto = JSON.parse(user);
    return userDetail.refreshToken;
  };
}