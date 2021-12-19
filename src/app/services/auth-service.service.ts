import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserEnt } from './../entities/userEnt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user!: UserEnt;
  private _token!: string;

  constructor(private http: HttpClient) { }

  public get user(): UserEnt{
    if (this._user != null) {
      return this._user;
    } else if (this._user == null && sessionStorage.getItem('user') != null) {
      this._user = JSON.parse(sessionStorage.getItem('user') || '{}') as UserEnt;
      return this._user;
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

  login(user: UserEnt): Observable<any> {
    const urlEndpoint = 'http://localhost:8080/oauth/token';

    const credentials = btoa('animalsApp' + ':' + '54321');

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credentials
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.username);
    params.set('password', user.password);
    console.log(params.toString());
    return this.http.post<any>(urlEndpoint, params.toString(), { headers: httpHeaders });
  }

  keepUser(accessToken: string): void {
    let payload = this.obtenerDatosToken(accessToken);
    this._user = new UserEnt();
    this._user.username = payload.user_name;
    this._user.roles = payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._user));
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }


  logout(): void {
    this._token = '';
    this._user = new UserEnt;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }
}
