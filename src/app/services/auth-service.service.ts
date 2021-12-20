import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserEnt } from './../entities/userEnt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userEnt!: UserEnt;
  private _token!: string;

  constructor(private http: HttpClient) { }

  public get userEnt(): UserEnt{
    if (this._userEnt != null) {
      return this._userEnt;
    } else if (this._userEnt == null && sessionStorage.getItem('userEnt') != null) {
      this._userEnt = JSON.parse(sessionStorage.getItem('userEnt') || '{}') as UserEnt;
      return this._userEnt;
    }
    return new UserEnt();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token') || '{}';
      return this._token;
    }
    return "";
  }

  login(userEnt: UserEnt): Observable<any> {
    const urlEndpoint = 'http://localhost:8080/oauth/token';

    const credentials = btoa('animalsApp' + ':' + '54321');

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credentials
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', userEnt.username);
    params.set('password', userEnt.password);
    console.log(params.toString());
    return this.http.post<any>(urlEndpoint, params.toString(), { headers: httpHeaders });
  }

  keepUser(accessToken: string): void {
    let payload = this.obtainTokenData(accessToken);
    this._userEnt = new UserEnt();
    this._userEnt.username = payload.user_name;
    this._userEnt.roles = payload.authorities;
    sessionStorage.setItem('userEnt', JSON.stringify(this._userEnt));
  }

  keepToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  obtainTokenData(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.obtainTokenData(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }


  logout(): void {
    this._token = '';
    this._userEnt = new UserEnt;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userEnt');
  }
}
