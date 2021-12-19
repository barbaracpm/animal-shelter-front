import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Animal } from '../entities/animal'
import {map} from 'rxjs/operators';
import { AuthService } from '../services/auth-service.service'
import { Region } from './../entities/region';
import { Specie } from './../entities/specie';


@Injectable({
  providedIn: 'root'
})
export class AnimalsService {

  urlEndPoint:string = 'http://localhost:8080/api/animals';

  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor( private http:HttpClient,private authService:AuthService) { }


   agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }


  getAnimals(): Observable<Animal[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map( (response) => response as Animal[] )
    );
  }

  create(animal: Animal) : Observable<Animal> {
    return this.http.post<Animal>(this.urlEndPoint, animal, { headers: this.agregarAuthorizationHeader() })
  }


  getAnimal(id:number): Observable<Animal>{
    return this.http.get<Animal>(`${this.urlEndPoint}/${id}`, { headers: this.agregarAuthorizationHeader() })
  }

  update(animal: Animal) : Observable<Animal> {
    return this.http.put<Animal>(`${this.urlEndPoint}/${animal.id}`, animal, { headers: this.agregarAuthorizationHeader() })
  }

  delete(id: number): Observable<Animal>{
    return this.http.delete<Animal>(`${this.urlEndPoint}/${id}`, { headers: this.agregarAuthorizationHeader() })
  }

  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPoint + '/regions', { headers: this.agregarAuthorizationHeader() }).pipe(
      map( (response) => response as Region[] )
    );
  }

  getSpecies(): Observable<Specie[]> {
    return this.http.get<Specie[]>(this.urlEndPoint + '/species', { headers: this.agregarAuthorizationHeader() }).pipe(
      map( (response) => response as Specie[] )
    );
  }

}
