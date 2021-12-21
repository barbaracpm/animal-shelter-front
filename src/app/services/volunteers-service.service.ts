import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Volunteer } from "../entities/volunteer";
import { AuthService } from "./auth-service.service";



@Injectable({
  providedIn: 'root'
})
export class VolunteersService {

  urlEndPoint:string = 'http://localhost:8080/api/volunteers';

  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor( private http:HttpClient,private authService:AuthService) { }


   agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }


  getVolunteers(): Observable<Volunteer[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map( (response) => response as Volunteer[] )
    );
  }

  create(volunteer: Volunteer) : Observable<Volunteer> {
    return this.http.post<Volunteer>(this.urlEndPoint, volunteer, { headers: this.agregarAuthorizationHeader() })
  }


  getVolunteer(id:number): Observable<Volunteer>{
    return this.http.get<Volunteer>(`${this.urlEndPoint}/${id}`, { headers: this.agregarAuthorizationHeader() })
  }

  update(volunteer: Volunteer) : Observable<Volunteer> {
    return this.http.put<Volunteer>(`${this.urlEndPoint}/${volunteer.id}`, volunteer, { headers: this.agregarAuthorizationHeader() })
  }

  delete(id: number): Observable<Volunteer>{
    return this.http.delete<Volunteer>(`${this.urlEndPoint}/${id}`, { headers: this.agregarAuthorizationHeader() })
  }



}
