import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GoogleBooksService {

  private http = inject (HttpClient)

  getVolumeByCategory(category: string, startIndex: number, maxResults: number): Observable<any> {
    const url = "https://www.googleapis.com/books/v1/volumes";
    const params = new HttpParams()
    .set("q", 'subject:fiction')
    .set("orderBy", "newest")
    .set("startIndex", startIndex.toString())
    .set("maxResults", maxResults.toString())
    .set("printType","books")
    .set("key", `${environment.googleBooksApiKey}`)
    console.log(this.http.get(url, { params }))
    return this.http.get(url, { params });
  }
}