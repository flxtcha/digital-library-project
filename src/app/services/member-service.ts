import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class MemberService {
  private readonly baseUrl = `${environment.apiUrl}`;
  private http = inject (HttpClient)

  registerUser(member: Member): Observable<any> {
    const url = `${this.baseUrl}:8080/members`;
    return this.http.post(url, member);
  }
}

export interface Member {
  firstName: string,
  lastName: string,
  email: string,
  mobileNumber: string
}