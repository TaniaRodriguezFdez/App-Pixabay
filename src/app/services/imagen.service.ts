import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  private error$ = new Subject<string>();
  private palabraBusqueda$ = new Subject<string>()

  constructor(private http: HttpClient) { }

  setError(mensaje: string) { 
    this.error$.next(mensaje);
  }

  getError(): Observable<string> { 
    return this.error$.asObservable();
  }

  enviarPalabraBusqueda(palabra: string) { 
    this.palabraBusqueda$.next(palabra);
  }
  getPalabraBusqueda(): Observable<string> { 
    return this.palabraBusqueda$.asObservable();
  }
  getImagenes(palabra: string, imagenesPorPagina:number, paginaActual:number): Observable<any>{ 
    const Key = '31732918-5db8bee9be9dc9d531ff8e2eb';
    const URL =
      'https://pixabay.com/api/?key=' +
      Key +
      '&q=' +
      palabra +
      '&per_page' +
      imagenesPorPagina +
      '&page=' +
      paginaActual;
    return this.http.get(URL);
  }
}
