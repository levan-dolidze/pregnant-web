import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SessionStorageService } from "src/app/shared/services/session-storage.service";
import { environment } from "src/environments/environment";

export type ApiResponse<T> = T & {
  status: number;
  description: string;
};



@Injectable({ providedIn: 'root' })
export class ApiService {


  readonly http = inject(HttpClient)
  readonly sessionStorage = inject(SessionStorageService)
  
  init() {
    const mode = this.sessionStorage.getKey('mode') ?? 'dark';
    if (mode) {document.documentElement.setAttribute('theme', mode)}
  }



  get(path: string, data = {}, props = {}): Observable<any> {
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      var item = data[key]
      if (item != undefined && item != "undefined") {
        if (Array.isArray(item)) {
          for (var i = 0; i < item.length; i++) {
            httpParams = httpParams.append(key, item[i]);
          }
        }
        else {
          httpParams = httpParams.append(key, item);
        }
      }
    });

    return this.http.get(`${environment.apiUrl}${path}`, { ...props, params: httpParams })
  }

  put(path: string, body: Object = {}): Observable<any> {
    this.sanitizeBody(body);
    return this.http.put(
      `${environment.apiUrl}${path}`,
      body
    );
  }

  post(path: string, body: Object = {}, options: any = {}): Observable<any> {
    this.sanitizeBody(body);
    return this.http.post(
      `${environment.apiUrl}${path}`,
      body,
      options
    );
  }

  formDataPost(url: string, formData: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}${url}`, formData, {
      reportProgress: true,
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data'
      })
    });
  }

  delete(path, body = null): Observable<any> {
    this.sanitizeBody(body);
    return this.http.delete(
      `${environment.apiUrl}${path}`,
      { body: body }
    );
  }

  private sanitizeBody(body: any): void {
    for (var param in body) {
      if (
        body[param] == undefined ||
        body[param] == null ||
        body[param] == "undefined" ||
        body[param] == "null"
      ) {
        delete body[param];
      }
    }
  }
}