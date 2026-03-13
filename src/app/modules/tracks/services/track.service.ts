import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly URL = environment.api;

  constructor(private httpClient: HttpClient) {}

  /**
   * @returns Function que devuelve la lista de canciones disponibles en la API
   * @author Ronald Olate
   * @date 2026-02-06
   */
  public getAllTracks$(): Observable<any>{
    return this.httpClient.get(`${this.URL}/tracks`)
    .pipe(
      map((dataRaw: any) => {
        return dataRaw.data;
      })
    );
  }

  /**
   * @returns Function que devuelve la lista de canciones aleatorias disponibles en la API
   * @author Ronald Olate
   * @date 2026-02-06
   */
  public getRandomTracks$(): Observable<any>{
    return this.httpClient.get(`${this.URL}/tracks`)
    .pipe(
      map((dataRaw: any) => {
        return dataRaw.data.reverse();
      }),
      catchError((error) => {
        console.log("Ha ocurrido un error ", error);
        return of([]);
      })
    );
  }

}
