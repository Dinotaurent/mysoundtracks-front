import { Observable } from 'rxjs';
import { Generic } from '../models/generic';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export abstract class CommonsService<E extends Generic> {
  protected URL: string;
  protected headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(protected http: HttpClient) {}

  public listar(): Observable<E[]> {
    return this.http.get<E[]>(this.URL);
  }

  public listarXId(id: number): Observable<E> {
    return this.http.get<E>(`${this.URL}${id}`);
  }

  public listarXPagina(page: string, size: string): Observable<any> {
    const PARAMS = new HttpParams().set('page', page).set('size', size);
    return this.http.get<any>(`${this.URL}pagina`, { params: PARAMS });
  }

  public buscarXNombre(nombre: string): Observable<E[]> {
    return this.http.get<E[]>(`${this.URL}buscar-x-nombre/${nombre}`);
  }

  public crear(e: E): Observable<E> {
    return this.http.post<E>(this.URL, e, {
      headers: this.headers,
    });
  }

  public crearConFoto(e: E, archivo: File): Observable<E>{
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('nombre', e.nombre);

    return this.http.post<E>(`${this.URL}crear-con-foto`, formData);
  }

  public editar(e: E): Observable<E> {
    return this.http.put<E>(`${this.URL}${e.id}`, e, {
      headers: this.headers,
    });
  }

  public editarConFoto(e: E, archivo: File): Observable<E>{
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('nombre', e.nombre);

    return this.http.put<E>(`${this.URL}actualizar-con-foto/${e.id}`, formData);
  }

  public eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}${id}`);
  }
}
